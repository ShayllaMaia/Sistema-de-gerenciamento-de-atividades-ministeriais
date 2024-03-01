-- CreateTable
CREATE TABLE `Eventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `tipoEvento` ENUM('CULTO', 'EVENTO') NOT NULL DEFAULT 'CULTO',
    `hora_inicio` DATETIME(3) NOT NULL,
    `hora_fim` DATETIME(3) NOT NULL,
    `descricao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
