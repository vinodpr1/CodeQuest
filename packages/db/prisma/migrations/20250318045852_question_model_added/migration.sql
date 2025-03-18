/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Question_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Question_title_key" ON "Question"("title");
