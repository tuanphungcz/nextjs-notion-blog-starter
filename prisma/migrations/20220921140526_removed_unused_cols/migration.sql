/*
  Warnings:

  - You are about to drop the column `author` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `convertKitApiKey` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `convertkitFormid` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `umamiId` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `umamiUrl` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `websiteUrl` on the `BlogWebsite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogWebsite" DROP COLUMN "author",
DROP COLUMN "convertKitApiKey",
DROP COLUMN "convertkitFormid",
DROP COLUMN "title",
DROP COLUMN "umamiId",
DROP COLUMN "umamiUrl",
DROP COLUMN "websiteUrl",
ADD COLUMN     "blogName" TEXT;
