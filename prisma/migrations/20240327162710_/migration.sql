-- DropForeignKey
ALTER TABLE `ServiceProviderWithdrawal` DROP FOREIGN KEY `ServiceProviderWithdrawal_userId_fkey`;

-- AlterTable
ALTER TABLE `ServiceProviderWithdrawal` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ServiceProviderWithdrawal` ADD CONSTRAINT `ServiceProviderWithdrawal_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
