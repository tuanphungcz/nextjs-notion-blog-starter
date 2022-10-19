/*
  Warnings:

  - You are about to drop the column `notionSecret` on the `BlogWebsite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogWebsite" DROP COLUMN "notionSecret",
ADD COLUMN     "convertkitApiKey" TEXT,
ADD COLUMN     "convertkitFormid" TEXT;
