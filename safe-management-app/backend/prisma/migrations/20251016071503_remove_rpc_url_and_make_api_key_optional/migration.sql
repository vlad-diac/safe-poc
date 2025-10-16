/*
  Warnings:

  - You are about to drop the column `rpcUrl` on the `SafeSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SafeSession" DROP COLUMN "rpcUrl",
ALTER COLUMN "apiKey" DROP NOT NULL;
