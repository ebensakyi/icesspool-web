/*
  Warnings:

  - Made the column `momoNumber` on table `MomoAccount` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `MomoAccount` MODIFY `momoNumber` VARCHAR(10) NOT NULL;

-- CreateTable
CREATE TABLE `JobTimeSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time_schedule` VARCHAR(191) NULL,
    `start_time` VARCHAR(191) NULL,
    `end_time` VARCHAR(191) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
