-- AlterTable
ALTER TABLE "SafeSession" ADD COLUMN     "assetBalances" JSONB,
ADD COLUMN     "lastBalanceUpdate" TIMESTAMP(3),
ADD COLUMN     "totalAssetValueUsd" TEXT;
