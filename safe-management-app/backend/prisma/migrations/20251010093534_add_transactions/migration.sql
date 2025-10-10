-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "safeAddress" TEXT NOT NULL,
    "safeTxHash" TEXT NOT NULL,
    "txType" TEXT,
    "executionDate" TIMESTAMP(3),
    "submissionDate" TIMESTAMP(3),
    "modified" TIMESTAMP(3),
    "blockNumber" INTEGER,
    "transactionHash" TEXT,
    "safe" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "data" TEXT,
    "operation" INTEGER NOT NULL,
    "gasToken" TEXT,
    "safeTxGas" TEXT,
    "baseGas" TEXT,
    "gasPrice" TEXT,
    "refundReceiver" TEXT,
    "nonce" INTEGER NOT NULL,
    "executor" TEXT,
    "isExecuted" BOOLEAN NOT NULL DEFAULT false,
    "isSuccessful" BOOLEAN,
    "ethGasPrice" TEXT,
    "maxFeePerGas" TEXT,
    "maxPriorityFeePerGas" TEXT,
    "gasUsed" TEXT,
    "fee" TEXT,
    "origin" TEXT,
    "dataDecoded" JSONB,
    "confirmationsRequired" INTEGER,
    "confirmations" JSONB,
    "trusted" BOOLEAN NOT NULL DEFAULT false,
    "proposer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionSync" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "safeAddress" TEXT NOT NULL,
    "lastSyncAt" TIMESTAMP(3) NOT NULL,
    "lastTxHash" TEXT,
    "totalSynced" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionSync_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_safeTxHash_key" ON "Transaction"("safeTxHash");

-- CreateIndex
CREATE INDEX "Transaction_safeAddress_idx" ON "Transaction"("safeAddress");

-- CreateIndex
CREATE INDEX "Transaction_sessionId_idx" ON "Transaction"("sessionId");

-- CreateIndex
CREATE INDEX "Transaction_isExecuted_idx" ON "Transaction"("isExecuted");

-- CreateIndex
CREATE INDEX "Transaction_executionDate_idx" ON "Transaction"("executionDate");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionSync_sessionId_key" ON "TransactionSync"("sessionId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SafeSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionSync" ADD CONSTRAINT "TransactionSync_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SafeSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
