-- CreateTable
CREATE TABLE "SafeSession" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "safeAddress" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "rpcUrl" TEXT NOT NULL,
    "transactionServiceUrl" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SafeSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentLink" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "safeAddress" TEXT NOT NULL,
    "safeTxHash" TEXT,
    "toAddress" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "PaymentLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentLink" ADD CONSTRAINT "PaymentLink_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SafeSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
