/*
  Warnings:

  - You are about to drop the column `blogName` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `convertkitApiKey` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `convertkitFormid` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `footerText` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `headerDescription` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `headerTitle` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `ogBanner` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `profileUrl` on the `BlogWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `BlogWebsite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogWebsite" DROP COLUMN "blogName",
DROP COLUMN "convertkitApiKey",
DROP COLUMN "convertkitFormid",
DROP COLUMN "footerText",
DROP COLUMN "github",
DROP COLUMN "headerDescription",
DROP COLUMN "headerTitle",
DROP COLUMN "linkedin",
DROP COLUMN "ogBanner",
DROP COLUMN "profileUrl",
DROP COLUMN "twitter";
