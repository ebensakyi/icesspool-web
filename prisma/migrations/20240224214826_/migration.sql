/*
  Warnings:

  - You are about to drop the column `cost` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `totalCost` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `cost`,
    ADD COLUMN `totalCost` DECIMAL(10, 2) NOT NULL;
