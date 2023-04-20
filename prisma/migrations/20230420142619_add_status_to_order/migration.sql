-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACCEPTED', 'PENDING', 'DENIED');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "accepted" "Status" NOT NULL DEFAULT 'PENDING';
