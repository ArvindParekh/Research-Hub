/*
  Warnings:

  - A unique constraint covering the columns `[interest]` on the table `ResearchInterest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ResearchInterest_interest_key" ON "ResearchInterest"("interest");
