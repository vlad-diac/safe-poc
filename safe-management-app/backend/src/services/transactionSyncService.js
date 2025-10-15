const { PrismaClient } = require('@prisma/client');
const { createSafeService } = require('./safeService');

const prisma = new PrismaClient({
  log: ['error', 'warn'], // Only log errors and warnings, not queries
});

/**
 * Sync transactions from Safe Transaction Service to database
 */
async function syncTransactions(sessionId) {
  try {
    const session = await prisma.safeSession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      throw new Error('Session not found');
    }

    console.log(`🔄 Starting transaction sync for Safe: ${session.safeAddress}`);

    const safeService = createSafeService(session);
    
    // Fetch both all transactions and pending transactions to ensure we get everything
    const [allTxsResponse, pendingTxsResponse] = await Promise.all([
      safeService.getAllTransactions(null, 100, 0),
      safeService.getPendingTransactions()
    ]);
    
    const allTxs = allTxsResponse.results || [];
    const pendingTxs = pendingTxsResponse.results || [];
    
    console.log(`📦 Fetched ${allTxs.length} total transactions and ${pendingTxs.length} pending transactions`);
    
    // Summary by transaction type
    const typeCount = allTxs.reduce((acc, tx) => {
      const type = tx.txType || 'UNKNOWN';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n========== TRANSACTION SUMMARY ==========');
    console.log('Transaction types from /all-transactions/:');
    Object.entries(typeCount).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    
    // Count executed vs pending from all transactions
    const executedCount = allTxs.filter(tx => tx.isExecuted === true).length;
    const notExecutedCount = allTxs.filter(tx => tx.isExecuted === false).length;
    const undefinedCount = allTxs.filter(tx => tx.isExecuted === undefined).length;
    
    console.log('\nExecution status:');
    console.log(`  Executed: ${executedCount}`);
    console.log(`  Not Executed: ${notExecutedCount}`);
    console.log(`  Undefined (likely ETHEREUM_TXs): ${undefinedCount}`);
    
    console.log(`\n========== PENDING TRANSACTIONS DETAIL (${pendingTxs.length}) ==========`);
    if (pendingTxs.length === 0) {
      console.log('  No pending transactions found.');
    } else {
      pendingTxs.forEach((tx, index) => {
        console.log(`\n[${index + 1}] Hash: ${tx.safeTxHash.substring(0, 10)}...`);
        console.log(`    To: ${tx.to}`);
        console.log(`    Value: ${tx.value || '0'} | Nonce: ${tx.nonce}`);
        console.log(`    Confirmations: ${tx.confirmations?.length || 0}/${tx.confirmationsRequired || 0}`);
        if (tx.confirmations && tx.confirmations.length > 0) {
          console.log(`    Signers: ${tx.confirmations.map(c => c.owner.substring(0, 10) + '...').join(', ')}`);
        }
      });
    }
    console.log('\n=========================================\n');
    
    // Combine and deduplicate transactions
    const txMap = new Map();
    
    // Add all transactions first
    allTxs.forEach(tx => {
      const hash = tx.safeTxHash || tx.txHash;
      if (hash) txMap.set(hash, tx);
    });
    
    // Add pending transactions (these might have more up-to-date confirmation info)
    pendingTxs.forEach(tx => {
      const hash = tx.safeTxHash;
      if (hash) {
        // If already exists, merge the data (pending might have more recent confirmations)
        const existing = txMap.get(hash);
        if (existing) {
          txMap.set(hash, { ...existing, ...tx });
        } else {
          txMap.set(hash, tx);
        }
      }
    });
    
    const transactions = Array.from(txMap.values());
    console.log(`📦 Total unique transactions to sync: ${transactions.length}`);

    let syncedCount = 0;
    let updatedCount = 0;

    console.log('💾 Syncing to database...');
    
    // Process each transaction
    for (let i = 0; i < transactions.length; i++) {
      const tx = transactions[i];
      
      // Show progress every 20 transactions
      if (i % 20 === 0 && i > 0) {
        console.log(`   Progress: ${i}/${transactions.length} (${Math.round(i/transactions.length*100)}%)`);
      }
      
      try {
        // Extract the transaction data based on type
        let txData;
        
        if (tx.txType === 'MULTISIG_TRANSACTION' || !tx.txType) {
          // Multisig transaction (the most common type)
          // For pending transactions, isExecuted will be false
          txData = {
            sessionId: session.id,
            safeAddress: session.safeAddress,
            safeTxHash: tx.safeTxHash,
            txType: tx.txType || 'MULTISIG_TRANSACTION',
            executionDate: tx.executionDate ? new Date(tx.executionDate) : null,
            submissionDate: tx.submissionDate ? new Date(tx.submissionDate) : null,
            modified: tx.modified ? new Date(tx.modified) : null,
            blockNumber: tx.blockNumber || null,
            transactionHash: tx.transactionHash || null,
            safe: tx.safe,
            to: tx.to,
            value: tx.value || '0',
            data: tx.data || null,
            operation: tx.operation || 0,
            gasToken: tx.gasToken || null,
            safeTxGas: tx.safeTxGas ? tx.safeTxGas.toString() : null,
            baseGas: tx.baseGas ? tx.baseGas.toString() : null,
            gasPrice: tx.gasPrice || null,
            refundReceiver: tx.refundReceiver || null,
            nonce: tx.nonce || 0,
            executor: tx.executor || null,
            isExecuted: tx.isExecuted || false,
            isSuccessful: tx.isSuccessful !== undefined ? tx.isSuccessful : null,
            ethGasPrice: tx.ethGasPrice || null,
            maxFeePerGas: tx.maxFeePerGas || null,
            maxPriorityFeePerGas: tx.maxPriorityFeePerGas || null,
            gasUsed: tx.gasUsed ? tx.gasUsed.toString() : null,
            fee: tx.fee || null,
            origin: tx.origin || null,
            dataDecoded: tx.dataDecoded || null,
            confirmationsRequired: tx.confirmationsRequired || null,
            confirmations: tx.confirmations || null,
            trusted: tx.trusted || false,
            proposer: tx.proposer || null,
          };
        } else if (tx.txType === 'ETHEREUM_TRANSACTION') {
          // Ethereum transaction (incoming/outgoing ETH or token transfers)
          txData = {
            sessionId: session.id,
            safeAddress: session.safeAddress,
            safeTxHash: tx.txHash || `eth_${tx.blockNumber}_${tx.transactionHash}`,
            txType: tx.txType,
            executionDate: tx.executionDate ? new Date(tx.executionDate) : null,
            blockNumber: tx.blockNumber || null,
            transactionHash: tx.transactionHash || null,
            safe: session.safeAddress,
            to: tx.to || '',
            value: tx.value || '0',
            data: null,
            operation: 0,
            nonce: 0,
            isExecuted: true,
            isSuccessful: true,
          };
        } else if (tx.txType === 'MODULE_TRANSACTION') {
          // Module transaction
          txData = {
            sessionId: session.id,
            safeAddress: session.safeAddress,
            safeTxHash: tx.safeTxHash || `module_${tx.blockNumber}_${tx.transactionHash}`,
            txType: tx.txType,
            executionDate: tx.executionDate ? new Date(tx.executionDate) : null,
            blockNumber: tx.blockNumber || null,
            transactionHash: tx.transactionHash || null,
            safe: tx.safe || session.safeAddress,
            to: tx.to || '',
            value: tx.value || '0',
            data: tx.data || null,
            operation: tx.operation || 0,
            nonce: 0,
            isExecuted: true,
          };
        } else {
          console.warn(`⚠️ Unknown transaction type: ${tx.txType}, skipping`);
          continue;
        }

        // Upsert transaction (create or update)
        await prisma.transaction.upsert({
          where: { safeTxHash: txData.safeTxHash },
          update: txData,
          create: txData,
        });

        syncedCount++;
      } catch (error) {
        console.error(`❌ Error syncing transaction ${tx.safeTxHash || tx.txHash}: ${error.message}`);
      }
    }

    // Update sync status
    await prisma.transactionSync.upsert({
      where: { sessionId: session.id },
      update: {
        lastSyncAt: new Date(),
        lastTxHash: transactions[0]?.safeTxHash || null,
        totalSynced: syncedCount,
      },
      create: {
        sessionId: session.id,
        safeAddress: session.safeAddress,
        lastSyncAt: new Date(),
        lastTxHash: transactions[0]?.safeTxHash || null,
        totalSynced: syncedCount,
      },
    });

    console.log(`✅ Transaction sync completed: ${syncedCount} synced/updated`);
    
    // Verify transactions were saved
    const dbCount = await prisma.transaction.count({
      where: { sessionId: session.id }
    });
    console.log(`📊 Database now contains ${dbCount} transactions for this session`);

    return {
      success: true,
      syncedCount,
      totalFetched: transactions.length,
      dbCount,
    };
  } catch (error) {
    console.error('❌ Transaction sync failed:', error);
    throw error;
  }
}

/**
 * Get transactions from database
 */
async function getTransactions(sessionId, options = {}) {
  const {
    limit = 50,
    offset = 0,
    pending = false,
    executed = false,
  } = options;

  const where = {
    sessionId,
  };

  if (pending) {
    where.isExecuted = false;
  } else if (executed) {
    where.isExecuted = true;
  }

  console.log(`📋 Fetching transactions for sessionId: ${sessionId}, filters:`, { pending, executed });

  const transactions = await prisma.transaction.findMany({
    where,
    orderBy: [
      { executionDate: 'desc' },
      { submissionDate: 'desc' },
      { createdAt: 'desc' },
    ],
    take: limit,
    skip: offset,
  });

  const total = await prisma.transaction.count({ where });

  console.log(`📊 Found ${transactions.length} transactions (total: ${total}) for session ${sessionId}`);

  return {
    results: transactions,
    count: total,
  };
}

/**
 * Get sync status
 */
async function getSyncStatus(sessionId) {
  return await prisma.transactionSync.findUnique({
    where: { sessionId },
  });
}

module.exports = {
  syncTransactions,
  getTransactions,
  getSyncStatus,
};

