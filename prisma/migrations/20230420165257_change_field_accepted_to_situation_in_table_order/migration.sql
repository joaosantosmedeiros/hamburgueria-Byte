/*
  Warnings:

  - You are about to drop the column `accepted` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "accepted",
ADD COLUMN     "situation" "Status" NOT NULL DEFAULT 'PENDING';
