/*
  Warnings:

  - The `settingData` column on the `BlogWebsite` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "BlogWebsite" DROP COLUMN "settingData",
ADD COLUMN     "settingData" JSONB;
