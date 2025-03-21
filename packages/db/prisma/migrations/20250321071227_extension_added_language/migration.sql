/*
  Warnings:

  - Added the required column `extension` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "extension" TEXT NOT NULL;
