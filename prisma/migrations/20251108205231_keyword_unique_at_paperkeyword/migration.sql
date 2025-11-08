/*
  Warnings:

  - A unique constraint covering the columns `[keyword]` on the table `PaperKeyword` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PaperKeyword_keyword_key" ON "PaperKeyword"("keyword");
