CREATE TABLE IF NOT EXISTS `ShopLists` (
    `id` INTEGER NOT NULL auto_increment , 
    `title` VARCHAR(255) NOT NULL, 
    `createdAt` DATETIME NOT NULL, 
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Items` (
    `id` INTEGER NOT NULL auto_increment , 
    `name` VARCHAR(255) NOT NULL, 
    `quantity` INTEGER NOT NULL, 
    `createdAt` DATETIME NOT NULL, 
    `ShopListId` INTEGER, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`ShopListId`) REFERENCES `ShopLists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB;