-- AlterTable
ALTER TABLE `BiodigesterServicePricing` ADD COLUMN `doubleLargeCost` DECIMAL(10, 2) NULL,
    ADD COLUMN `largeCost` DECIMAL(10, 2) NULL,
    ADD COLUMN `standardCost` DECIMAL(10, 2) NULL;
