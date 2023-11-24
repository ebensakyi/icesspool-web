-- CreateTable
CREATE TABLE `Otp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TruckClassification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `tankCapacity` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `serviceAreaId` INTEGER NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `status` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `axleClass`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `status` INTEGER NULL DEFAULT 1,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Balance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `balance` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `mainEntityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionClosure` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `transactionId` VARCHAR(255) NULL,
    `gpsAccuracy` DECIMAL(10, 2) NULL,
    `lat` DECIMAL(10, 8) NULL,
    `lng` DECIMAL(10, 8) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Discount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trip1` DECIMAL(10, 2) NOT NULL,
    `trip2` DECIMAL(10, 2) NOT NULL,
    `trip3` DECIMAL(10, 2) NOT NULL,
    `trip4` DECIMAL(10, 2) NOT NULL,
    `trip5` DECIMAL(10, 2) NOT NULL,
    `beyond5` DECIMAL(10, 2) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Region` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `latitude` DECIMAL(10, 6) NULL,
    `longitude` DECIMAL(10, 6) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceArea` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `lat1` DECIMAL(10, 2) NOT NULL,
    `lng1` DECIMAL(10, 2) NOT NULL,
    `lat2` DECIMAL(10, 2) NOT NULL,
    `lng2` DECIMAL(10, 2) NOT NULL,
    `lat3` DECIMAL(10, 2) NOT NULL,
    `lng3` DECIMAL(10, 2) NOT NULL,
    `lat4` DECIMAL(10, 2) NOT NULL,
    `lng4` DECIMAL(10, 2) NOT NULL,
    `regionId` INTEGER NOT NULL,
    `status` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ServiceArea_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServicesInArea` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceAreaId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `status` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ServicesInArea_serviceAreaId_serviceId_key`(`serviceAreaId`, `serviceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MainEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mainEntityId` INTEGER NOT NULL,
    `commission` DECIMAL(10, 2) NOT NULL,
    `status` INTEGER NULL DEFAULT 1,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `commission`(`commission`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `activity` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NULL,
    `to` INTEGER NOT NULL,
    `sentBy` INTEGER NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MomoAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operatorId` VARCHAR(255) NOT NULL,
    `momoNumber` VARCHAR(255) NULL,
    `momoNetwork` INTEGER NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `operatorId`(`operatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MomoNetwork` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `network` VARCHAR(255) NOT NULL,
    `abbrv` VARCHAR(255) NOT NULL,
    `status` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(255) NOT NULL,
    `paymentId` VARCHAR(255) NOT NULL,
    `status` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DesludgingServicePricing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fuelDistanceConst` DECIMAL(10, 2) NOT NULL,
    `insurance` DECIMAL(10, 2) NOT NULL,
    `repairCost` DECIMAL(10, 2) NOT NULL,
    `roadWorthy` DECIMAL(10, 2) NOT NULL,
    `unitFuelCost` DECIMAL(10, 2) NOT NULL,
    `workingDays` INTEGER NOT NULL,
    `truckDepreciation` INTEGER NOT NULL,
    `adminCost` DECIMAL(10, 2) NOT NULL,
    `overheadCost` DECIMAL(10, 2) NOT NULL,
    `toolsCost` DECIMAL(10, 2) NOT NULL,
    `profitPercentage` DECIMAL(10, 2) NOT NULL,
    `pumpDepreciation` DECIMAL(10, 2) NOT NULL,
    `truckClassificationId` INTEGER NOT NULL,
    `status` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `regionId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `serviceAreaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WaterServicePricing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fuelDistanceConst` DECIMAL(10, 2) NOT NULL,
    `insurance` DECIMAL(10, 2) NOT NULL,
    `repairCost` DECIMAL(10, 2) NOT NULL,
    `roadWorthy` DECIMAL(10, 2) NOT NULL,
    `unitFuelCost` DECIMAL(10, 2) NOT NULL,
    `workingDays` INTEGER NOT NULL,
    `truckDepreciation` DECIMAL(10, 2) NOT NULL,
    `adminCost` DECIMAL(10, 2) NOT NULL,
    `overheadCost` DECIMAL(10, 2) NOT NULL,
    `toolsCost` DECIMAL(10, 2) NOT NULL,
    `profitPercentage` DECIMAL(10, 2) NOT NULL,
    `pumpDepreciation` DECIMAL(10, 2) NOT NULL,
    `truckClassificationId` INTEGER NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `regionId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `serviceAreaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BiodigesterServicePricing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fuelDistanceConst` DECIMAL(10, 2) NULL,
    `insurance` DECIMAL(10, 2) NULL,
    `repairCost` DECIMAL(10, 2) NULL,
    `roadWorthy` DECIMAL(10, 2) NULL,
    `unitFuelCost` DECIMAL(10, 2) NULL,
    `workingDays` INTEGER NULL,
    `truckDepreciation` INTEGER NULL,
    `adminCost` DECIMAL(10, 2) NULL,
    `overheadCost` DECIMAL(10, 2) NULL,
    `toolsCost` DECIMAL(10, 2) NULL,
    `profitPercentage` DECIMAL(10, 2) NULL,
    `pumpDepreciation` DECIMAL(10, 2) NULL,
    `truckClassificationId` INTEGER NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `regionId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `serviceAreaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operator` (
    `id` VARCHAR(255) NOT NULL,
    `userId` INTEGER NULL,
    `passportPicture` TEXT NULL,
    `idCardPicture` TEXT NULL,
    `company` VARCHAR(255) NULL,
    `officeLocation` VARCHAR(255) NULL,
    `ghanaPostGPS` VARCHAR(255) NULL,
    `licenseNumber` VARCHAR(255) NULL,
    `licenseClassification` INTEGER NULL,
    `driversLicense` VARCHAR(255) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProviderEarning` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(255) NOT NULL,
    `operatorId` VARCHAR(255) NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `completionDate` VARCHAR(255) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `transactionId`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OperatorRating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operatorId` VARCHAR(255) NOT NULL,
    `rating` DECIMAL(2, 1) NULL DEFAULT 0.0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionRating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(255) NOT NULL,
    `rating` DECIMAL(2, 1) NULL DEFAULT 0.0,
    `comment` VARCHAR(255) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `transactionId`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RatingBreakdown` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ratingId` INTEGER NOT NULL,
    `helmet` INTEGER NULL,
    `abusive` INTEGER NULL,
    `overall` INTEGER NULL,
    `boots` INTEGER NULL,
    `respirator` INTEGER NULL,
    `eyesProtector` INTEGER NULL,
    `cashDemand` INTEGER NULL,
    `damageProperty` INTEGER NULL,
    `closeOpenSeal` INTEGER NULL,
    `cleanEnvironment` INTEGER NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ratingId`(`ratingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScannerUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `tipoffPointId` INTEGER NULL,
    `activated` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` VARCHAR(255) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServicePoint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `placeId` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `location` VARCHAR(255) NULL,
    `latitude` DECIMAL(10, 6) NULL,
    `longitude` DECIMAL(10, 6) NULL,
    `status` INTEGER NULL DEFAULT 1,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(255) NOT NULL,
    `operatorId` VARCHAR(255) NULL,
    `clientId` VARCHAR(255) NULL,
    `unitCost` DECIMAL(10, 2) NOT NULL,
    `discountedTotalCost` DECIMAL(10, 2) NOT NULL,
    `actualTotalCost` DECIMAL(10, 2) NOT NULL,
    `community` VARCHAR(255) NOT NULL,
    `gpsAccuracy` DECIMAL(10, 2) NULL,
    `lat` DECIMAL(10, 8) NULL,
    `lng` DECIMAL(10, 8) NULL,
    `axle` INTEGER NOT NULL,
    `trips` INTEGER NOT NULL,
    `paymentStatus` INTEGER NULL DEFAULT 0,
    `currentStatus` INTEGER NOT NULL,
    `requestTypeId` INTEGER NULL DEFAULT 1,
    `toiletType` VARCHAR(255) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `requestSource` INTEGER NULL,
    `customerName` VARCHAR(100) NULL,
    `customerPhoneNumber` VARCHAR(100) NULL,
    `serviceType` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(255) NOT NULL,
    `status` INTEGER NOT NULL,
    `date` DATE NULL,
    `time` TIME(0) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `surname` VARCHAR(255) NOT NULL,
    `otherNames` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(255) NOT NULL,
    `fcm` VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `userTypeId` INTEGER NOT NULL,
    `activated` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `vehicleNumber` VARCHAR(255) NULL,
    `owner` VARCHAR(255) NULL,
    `ownerNumber` VARCHAR(255) NULL,
    `insuranceExpiry` VARCHAR(255) NULL,
    `insuranceNumber` VARCHAR(255) NULL,
    `roadWorthyExpiry` VARCHAR(255) NULL,
    `roadWorthy` VARCHAR(255) NULL,
    `tankCapacity` INTEGER NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `truckClassificationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Withdrawal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `operatorId` VARCHAR(255) NOT NULL,
    `transactionId` VARCHAR(255) NULL,
    `amount` INTEGER NULL,
    `disbursementDate` DATETIME(3) NULL,
    `status` INTEGER NULL DEFAULT 0,
    `approvedBy` INTEGER NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TruckClassification` ADD CONSTRAINT `TruckClassification_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TruckClassification` ADD CONSTRAINT `TruckClassification_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Balance` ADD CONSTRAINT `Balance_mainEntityId_fkey` FOREIGN KEY (`mainEntityId`) REFERENCES `MainEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceArea` ADD CONSTRAINT `ServiceArea_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServicesInArea` ADD CONSTRAINT `ServicesInArea_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServicesInArea` ADD CONSTRAINT `ServicesInArea_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commission` ADD CONSTRAINT `Commission_mainEntityId_fkey` FOREIGN KEY (`mainEntityId`) REFERENCES `MainEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DesludgingServicePricing` ADD CONSTRAINT `DesludgingServicePricing_truckClassificationId_fkey` FOREIGN KEY (`truckClassificationId`) REFERENCES `TruckClassification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DesludgingServicePricing` ADD CONSTRAINT `DesludgingServicePricing_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DesludgingServicePricing` ADD CONSTRAINT `DesludgingServicePricing_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DesludgingServicePricing` ADD CONSTRAINT `DesludgingServicePricing_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterServicePricing` ADD CONSTRAINT `WaterServicePricing_truckClassificationId_fkey` FOREIGN KEY (`truckClassificationId`) REFERENCES `TruckClassification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterServicePricing` ADD CONSTRAINT `WaterServicePricing_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterServicePricing` ADD CONSTRAINT `WaterServicePricing_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterServicePricing` ADD CONSTRAINT `WaterServicePricing_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BiodigesterServicePricing` ADD CONSTRAINT `BiodigesterServicePricing_truckClassificationId_fkey` FOREIGN KEY (`truckClassificationId`) REFERENCES `TruckClassification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BiodigesterServicePricing` ADD CONSTRAINT `BiodigesterServicePricing_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BiodigesterServicePricing` ADD CONSTRAINT `BiodigesterServicePricing_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BiodigesterServicePricing` ADD CONSTRAINT `BiodigesterServicePricing_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServicePoint` ADD CONSTRAINT `ServicePoint_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_truckClassificationId_fkey` FOREIGN KEY (`truckClassificationId`) REFERENCES `TruckClassification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
