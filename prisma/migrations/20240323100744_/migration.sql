/*
  Warnings:

  - You are about to drop the `ToiletTankerTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ToiletTankerTransaction` DROP FOREIGN KEY `ToiletTankerTransaction_transactionId_fkey`;

-- AlterTable
ALTER TABLE `ServicePoint` ADD COLUMN `serviceAreaId` INTEGER NULL;

-- DropTable
DROP TABLE `ToiletTankerTransaction`;

-- CreateTable
CREATE TABLE `ToiletTruckTransaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `transactionId` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServicePoint` ADD CONSTRAINT `ServicePoint_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ToiletTruckTransaction` ADD CONSTRAINT `ToiletTruckTransaction_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
