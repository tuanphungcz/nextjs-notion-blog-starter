-- DropIndex
DROP INDEX "BlogWebsite_userId_key";

-- AlterTable
ALTER TABLE "BlogWebsite" ALTER COLUMN "umamiUrl" DROP NOT NULL;
