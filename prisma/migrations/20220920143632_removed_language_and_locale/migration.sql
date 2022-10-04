/*
  Warnings:

  - You are about to drop the column `customDomain` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `locale` on the `BlogWebsite` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "BlogWebsite_email_key";

-- AlterTable
ALTER TABLE "BlogWebsite" DROP COLUMN "customDomain",
DROP COLUMN "language",
DROP COLUMN "locale",
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "headerTitle" DROP NOT NULL,
ALTER COLUMN "profileUrl" DROP NOT NULL,
ALTER COLUMN "headerDescription" DROP NOT NULL,
ALTER COLUMN "footerText" DROP NOT NULL,
ALTER COLUMN "ogBanner" DROP NOT NULL,
ALTER COLUMN "github" DROP NOT NULL,
ALTER COLUMN "twitter" DROP NOT NULL,
ALTER COLUMN "websiteUrl" DROP NOT NULL,
ALTER COLUMN "linkedin" DROP NOT NULL,
ALTER COLUMN "notionSecret" DROP NOT NULL,
ALTER COLUMN "convertkitFormid" DROP NOT NULL,
ALTER COLUMN "convertKitApiKey" DROP NOT NULL,
ALTER COLUMN "umamiId" DROP NOT NULL;
