-- CreateTable
CREATE TABLE "DraftTransaction" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "safeAddress" TEXT NOT NULL,
    "safeTxHash" TEXT NOT NULL,
    "transactionData" TEXT NOT NULL,
    "recipients" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "senderAddress" TEXT,
    "senderSignature" TEXT,
    "signedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "DraftTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DraftTransaction_safeTxHash_key" ON "DraftTransaction"("safeTxHash");

-- CreateIndex
CREATE INDEX "DraftTransaction_sessionId_idx" ON "DraftTransaction"("sessionId");

-- CreateIndex
CREATE INDEX "DraftTransaction_status_idx" ON "DraftTransaction"("status");

-- CreateIndex
CREATE INDEX "DraftTransaction_safeTxHash_idx" ON "DraftTransaction"("safeTxHash");

-- AddForeignKey
ALTER TABLE "DraftTransaction" ADD CONSTRAINT "DraftTransaction_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SafeSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
