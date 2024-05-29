-- CreateTable
CREATE TABLE `Otp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TruckClassification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NULL,
    `serviceId` INTEGER NOT NULL,
    `tankCapacity` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `serviceAreaId` INTEGER NOT NULL,
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
CREATE TABLE `ServiceProviderBalance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `balance` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `serviceProviderId` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `serviceProviderId`(`serviceProviderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlatformBalance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `balance` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IcesspoolBalance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `balance` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

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
    `lat1` DECIMAL(10, 6) NOT NULL,
    `lng1` DECIMAL(10, 6) NOT NULL,
    `lat2` DECIMAL(10, 6) NOT NULL,
    `lng2` DECIMAL(10, 6) NOT NULL,
    `lat3` DECIMAL(10, 6) NOT NULL,
    `lng3` DECIMAL(10, 6) NOT NULL,
    `lat4` DECIMAL(10, 6) NOT NULL,
    `lng4` DECIMAL(10, 6) NOT NULL,
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
CREATE TABLE `BiodigesterService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `shortDesc` VARCHAR(255) NULL,
    `fullDesc` VARCHAR(1000) NULL,
    `imageUrl` VARCHAR(255) NULL,
    `status` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `biodigesterTypeId` INTEGER NOT NULL,

    UNIQUE INDEX `BiodigesterService_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BiodigesterType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `status` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BiodigesterType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WaterType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `status` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `WaterType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BiodigesterServicePricing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `biodigesterServiceId` INTEGER NOT NULL,
    `cost` DECIMAL(10, 2) NOT NULL,
    `standardCost` DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    `largeCost` DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    `status` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `serviceAreaId` INTEGER NOT NULL,

    UNIQUE INDEX `BiodigesterServicePricing_serviceAreaId_biodigesterServiceId_key`(`serviceAreaId`, `biodigesterServiceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `District` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `abbrv` VARCHAR(255) NOT NULL,
    `regionId` INTEGER NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DistrictCoordinates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lat` DECIMAL(10, 8) NOT NULL,
    `lng` DECIMAL(10, 8) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `districtId` INTEGER NOT NULL,

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
CREATE TABLE `Sms` (
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
CREATE TABLE `Notification` (
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
    `serviceProviderId` VARCHAR(255) NOT NULL,
    `momoNumber` VARCHAR(10) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `momoNetworkId` INTEGER NOT NULL,

    UNIQUE INDEX `serviceProviderId`(`serviceProviderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scheduledDate` DATETIME(3) NOT NULL,
    `status` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `transactionId` VARCHAR(255) NOT NULL,
    `timeFrameId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MomoNetwork` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `abbrv` VARCHAR(255) NULL,
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
CREATE TABLE `ToiletTruckServicePricing` (
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
    `elevy` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `otherServiceCharges` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `truckClassificationId` INTEGER NOT NULL,
    `status` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `regionId` INTEGER NULL,
    `serviceId` INTEGER NOT NULL,
    `serviceAreaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WaterTankerServicePricing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `insurance` DECIMAL(10, 2) NOT NULL,
    `repairCost` DECIMAL(10, 2) NOT NULL,
    `roadWorthy` DECIMAL(10, 2) NOT NULL,
    `unitFuelCost` DECIMAL(10, 2) NOT NULL,
    `rawWaterCost` DECIMAL(10, 2) NOT NULL,
    `workingDays` INTEGER NOT NULL,
    `truckDepreciation` DECIMAL(10, 2) NOT NULL,
    `adminCost` DECIMAL(10, 2) NOT NULL,
    `overheadCost` DECIMAL(10, 2) NOT NULL,
    `toolsCost` DECIMAL(10, 2) NOT NULL,
    `profitPercentage` DECIMAL(10, 2) NOT NULL,
    `pumpDepreciation` DECIMAL(10, 2) NULL,
    `waterUnitCost` DECIMAL(10, 2) NULL,
    `rawUnitCost` DECIMAL(10, 2) NULL,
    `truckClassificationId` INTEGER NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `elevy` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `regionId` INTEGER NULL,
    `serviceId` INTEGER NOT NULL,
    `serviceAreaId` INTEGER NULL,
    `status` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `userUpdatesAllowed` INTEGER NULL DEFAULT 0,
    `userDeletionAllowed` INTEGER NULL DEFAULT 0,
    `inspectionUpdatesAllowed` INTEGER NULL DEFAULT 0,
    `inspectionPublishAllowed` INTEGER NULL DEFAULT 0,
    `inspectionDeletionAllowed` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PageAccess` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageId` INTEGER NOT NULL,
    `userTypeId` INTEGER NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NULL,
    `icon` VARCHAR(255) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Page_name_key`(`name`),
    UNIQUE INDEX `Page_path_key`(`path`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceProvider` (
    `id` VARCHAR(255) NOT NULL,
    `userId` INTEGER NOT NULL,
    `idCardImg` VARCHAR(255) NULL,
    `company` VARCHAR(255) NULL,
    `officeLocation` VARCHAR(255) NULL,
    `ghanaPostGPS` VARCHAR(255) NULL,
    `licenseNumber` VARCHAR(255) NULL,
    `licenseClassification` INTEGER NULL,
    `driversLicenseImg` VARCHAR(255) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `serviceId` INTEGER NOT NULL,

    UNIQUE INDEX `ServiceProvider_id_key`(`id`),
    UNIQUE INDEX `ServiceProvider_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceProviderEarning` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(255) NOT NULL,
    `serviceProviderId` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `completionDate` VARCHAR(30) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `transactionId`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IcesspoolEarning` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `transactionId`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlatformEarning` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `transactionId`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceProviderRating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` DECIMAL(2, 1) NULL DEFAULT 0.0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `serviceProviderId` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `serviceProviderId`(`serviceProviderId`),
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
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `ratingQuestionId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `ratingId`(`ratingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RatingQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TxStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
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
    `serviceAreaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TruckEmptyingTransaction` (
    `id` VARCHAR(255) NOT NULL,
    `community` VARCHAR(255) NULL,
    `gpsAccuracy` DECIMAL(10, 2) NULL,
    `lat` DECIMAL(65, 30) NOT NULL,
    `lng` DECIMAL(65, 30) NOT NULL,
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
    `truckClassificationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(255) NOT NULL,
    `discountedCost` DECIMAL(10, 2) NULL,
    `totalCost` DECIMAL(10, 2) NOT NULL,
    `community` VARCHAR(255) NULL,
    `gpsAccuracy` DECIMAL(10, 2) NULL,
    `lat` DECIMAL(65, 30) NOT NULL,
    `lng` DECIMAL(65, 30) NOT NULL,
    `placeLat` DECIMAL(65, 30) NULL,
    `placeLng` DECIMAL(65, 30) NULL,
    `placeId` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `trips` INTEGER NOT NULL DEFAULT 1,
    `paymentStatus` INTEGER NULL DEFAULT 0,
    `requestTypeId` INTEGER NULL DEFAULT 1,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `requestSource` INTEGER NULL,
    `customerName` VARCHAR(100) NULL,
    `customerPhoneNumber` VARCHAR(100) NULL,
    `serviceId` INTEGER NOT NULL,
    `serviceProviderId` INTEGER NULL,
    `customerId` INTEGER NOT NULL,
    `serviceAreaId` INTEGER NOT NULL,
    `currentStatus` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ToiletTruckTransaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `transactionId` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WaterTankerTransaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(255) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `waterTypeId` INTEGER NOT NULL,

    UNIQUE INDEX `WaterTankerTransaction_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BiodigesterTransaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(255) NOT NULL,
    `unitCost` DECIMAL(10, 2) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `biodigesterTypeId` INTEGER NULL,
    `biodigesterServiceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WaterTransaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(255) NOT NULL,
    `unitCost` DECIMAL(10, 2) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `waterTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceCharges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `icesspoolCommission` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `platformCommission` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `paymentCharges` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `otherCharges` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `serviceAreaId` INTEGER NOT NULL,

    UNIQUE INDEX `ServiceCharges_serviceAreaId_serviceId_key`(`serviceAreaId`, `serviceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(255) NOT NULL,
    `date` DATE NULL,
    `time` TIME(0) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `txStatusId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastName` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(255) NOT NULL,
    `fcmId` VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `passportPicture` VARCHAR(255) NULL,
    `passwordChanged` INTEGER NULL DEFAULT 0,
    `activated` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userTypeId` INTEGER NOT NULL,
    `serviceAreaId` INTEGER NULL,

    UNIQUE INDEX `User_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
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
CREATE TABLE `ServiceProviderWithdrawal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceProviderId` VARCHAR(255) NOT NULL,
    `transactionId` VARCHAR(255) NULL,
    `amount` DECIMAL(10, 2) NULL,
    `disbursementDate` DATETIME(3) NULL,
    `status` INTEGER NULL DEFAULT 0,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScannerUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `servicePointId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penalty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fine` DECIMAL(65, 30) NOT NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimeFrame` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time_schedule` VARCHAR(191) NOT NULL,
    `start_time` VARCHAR(191) NOT NULL,
    `end_time` VARCHAR(191) NULL,
    `deleted` INTEGER NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Otp` ADD CONSTRAINT `Otp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TruckClassification` ADD CONSTRAINT `TruckClassification_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TruckClassification` ADD CONSTRAINT `TruckClassification_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceProviderBalance` ADD CONSTRAINT `ServiceProviderBalance_serviceProviderId_fkey` FOREIGN KEY (`serviceProviderId`) REFERENCES `ServiceProvider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceArea` ADD CONSTRAINT `ServiceArea_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServicesInArea` ADD CONSTRAINT `ServicesInArea_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServicesInArea` ADD CONSTRAINT `ServicesInArea_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BiodigesterService` ADD CONSTRAINT `BiodigesterService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BiodigesterService` ADD CONSTRAINT `BiodigesterService_biodigesterTypeId_fkey` FOREIGN KEY (`biodigesterTypeId`) REFERENCES `BiodigesterType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BiodigesterServicePricing` ADD CONSTRAINT `BiodigesterServicePricing_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BiodigesterServicePricing` ADD CONSTRAINT `BiodigesterServicePricing_biodigesterServiceId_fkey` FOREIGN KEY (`biodigesterServiceId`) REFERENCES `BiodigesterService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `District` ADD CONSTRAINT `District_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DistrictCoordinates` ADD CONSTRAINT `DistrictCoordinates_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `District`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MomoAccount` ADD CONSTRAINT `MomoAccount_serviceProviderId_fkey` FOREIGN KEY (`serviceProviderId`) REFERENCES `ServiceProvider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MomoAccount` ADD CONSTRAINT `MomoAccount_momoNetworkId_fkey` FOREIGN KEY (`momoNetworkId`) REFERENCES `MomoNetwork`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionSchedule` ADD CONSTRAINT `TransactionSchedule_timeFrameId_fkey` FOREIGN KEY (`timeFrameId`) REFERENCES `TimeFrame`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionSchedule` ADD CONSTRAINT `TransactionSchedule_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ToiletTruckServicePricing` ADD CONSTRAINT `ToiletTruckServicePricing_truckClassificationId_fkey` FOREIGN KEY (`truckClassificationId`) REFERENCES `TruckClassification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ToiletTruckServicePricing` ADD CONSTRAINT `ToiletTruckServicePricing_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ToiletTruckServicePricing` ADD CONSTRAINT `ToiletTruckServicePricing_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ToiletTruckServicePricing` ADD CONSTRAINT `ToiletTruckServicePricing_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterTankerServicePricing` ADD CONSTRAINT `WaterTankerServicePricing_truckClassificationId_fkey` FOREIGN KEY (`truckClassificationId`) REFERENCES `TruckClassification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterTankerServicePricing` ADD CONSTRAINT `WaterTankerServicePricing_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterTankerServicePricing` ADD CONSTRAINT `WaterTankerServicePricing_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterTankerServicePricing` ADD CONSTRAINT `WaterTankerServicePricing_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PageAccess` ADD CONSTRAINT `PageAccess_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PageAccess` ADD CONSTRAINT `PageAccess_userTypeId_fkey` FOREIGN KEY (`userTypeId`) REFERENCES `UserType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceProvider` ADD CONSTRAINT `ServiceProvider_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceProvider` ADD CONSTRAINT `ServiceProvider_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceProviderEarning` ADD CONSTRAINT `ServiceProviderEarning_serviceProviderId_fkey` FOREIGN KEY (`serviceProviderId`) REFERENCES `ServiceProvider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceProviderEarning` ADD CONSTRAINT `ServiceProviderEarning_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IcesspoolEarning` ADD CONSTRAINT `IcesspoolEarning_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlatformEarning` ADD CONSTRAINT `PlatformEarning_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceProviderRating` ADD CONSTRAINT `ServiceProviderRating_serviceProviderId_fkey` FOREIGN KEY (`serviceProviderId`) REFERENCES `ServiceProvider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionRating` ADD CONSTRAINT `TransactionRating_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RatingBreakdown` ADD CONSTRAINT `RatingBreakdown_ratingQuestionId_fkey` FOREIGN KEY (`ratingQuestionId`) REFERENCES `RatingQuestion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RatingBreakdown` ADD CONSTRAINT `RatingBreakdown_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServicePoint` ADD CONSTRAINT `ServicePoint_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServicePoint` ADD CONSTRAINT `ServicePoint_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TruckEmptyingTransaction` ADD CONSTRAINT `TruckEmptyingTransaction_truckClassificationId_fkey` FOREIGN KEY (`truckClassificationId`) REFERENCES `TruckClassification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_serviceProviderId_fkey` FOREIGN KEY (`serviceProviderId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_currentStatus_fkey` FOREIGN KEY (`currentStatus`) REFERENCES `TxStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ToiletTruckTransaction` ADD CONSTRAINT `ToiletTruckTransaction_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterTankerTransaction` ADD CONSTRAINT `WaterTankerTransaction_waterTypeId_fkey` FOREIGN KEY (`waterTypeId`) REFERENCES `WaterType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterTankerTransaction` ADD CONSTRAINT `WaterTankerTransaction_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BiodigesterTransaction` ADD CONSTRAINT `BiodigesterTransaction_biodigesterServiceId_fkey` FOREIGN KEY (`biodigesterServiceId`) REFERENCES `BiodigesterService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BiodigesterTransaction` ADD CONSTRAINT `BiodigesterTransaction_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BiodigesterTransaction` ADD CONSTRAINT `BiodigesterTransaction_biodigesterTypeId_fkey` FOREIGN KEY (`biodigesterTypeId`) REFERENCES `BiodigesterType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterTransaction` ADD CONSTRAINT `WaterTransaction_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WaterTransaction` ADD CONSTRAINT `WaterTransaction_waterTypeId_fkey` FOREIGN KEY (`waterTypeId`) REFERENCES `WaterType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceCharges` ADD CONSTRAINT `ServiceCharges_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceCharges` ADD CONSTRAINT `ServiceCharges_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionStatus` ADD CONSTRAINT `TransactionStatus_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionStatus` ADD CONSTRAINT `TransactionStatus_txStatusId_fkey` FOREIGN KEY (`txStatusId`) REFERENCES `TxStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userTypeId_fkey` FOREIGN KEY (`userTypeId`) REFERENCES `UserType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_serviceAreaId_fkey` FOREIGN KEY (`serviceAreaId`) REFERENCES `ServiceArea`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_truckClassificationId_fkey` FOREIGN KEY (`truckClassificationId`) REFERENCES `TruckClassification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceProviderWithdrawal` ADD CONSTRAINT `ServiceProviderWithdrawal_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceProviderWithdrawal` ADD CONSTRAINT `ServiceProviderWithdrawal_serviceProviderId_fkey` FOREIGN KEY (`serviceProviderId`) REFERENCES `ServiceProvider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScannerUser` ADD CONSTRAINT `ScannerUser_servicePointId_fkey` FOREIGN KEY (`servicePointId`) REFERENCES `ServicePoint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScannerUser` ADD CONSTRAINT `ScannerUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penalty` ADD CONSTRAINT `Penalty_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
