-- CreateTable
CREATE TABLE `Ministerio` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Ministerio_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MinisterioLider` (
    `ministerio_id` VARCHAR(191) NOT NULL,
    `lider_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ministerio_id`, `lider_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Atividade` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `ministerio_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Atividade_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MembrosAtividade` (
    `atividade_id` VARCHAR(191) NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`atividade_id`, `usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `dataNascimento` DATETIME(3) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `tipoUsuario` ENUM('NORMAL', 'LIDER', 'ADMIN') NOT NULL DEFAULT 'NORMAL',

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MembrosMinisterios` (
    `id` VARCHAR(191) NOT NULL,
    `ministerio_id` VARCHAR(191) NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,
    `preferenciasAtividades` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Eventos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `tipoEvento` ENUM('CULTO', 'EVENTO') NOT NULL DEFAULT 'CULTO',
    `hora_inicio` DATETIME(3) NOT NULL,
    `hora_fim` DATETIME(3) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `isRecorrente` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Escala` (
    `id` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `eventos_id` VARCHAR(191) NOT NULL,
    `ministerio_id` VARCHAR(191) NOT NULL,
    `atividade_id` VARCHAR(191) NOT NULL,
    `recorrente` BOOLEAN NOT NULL,
    `dia_semana` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participacao` (
    `id` VARCHAR(191) NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,
    `escala_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MinisterioLider` ADD CONSTRAINT `MinisterioLider_ministerio_id_fkey` FOREIGN KEY (`ministerio_id`) REFERENCES `Ministerio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MinisterioLider` ADD CONSTRAINT `MinisterioLider_lider_id_fkey` FOREIGN KEY (`lider_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atividade` ADD CONSTRAINT `Atividade_ministerio_id_fkey` FOREIGN KEY (`ministerio_id`) REFERENCES `Ministerio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MembrosAtividade` ADD CONSTRAINT `MembrosAtividade_atividade_id_fkey` FOREIGN KEY (`atividade_id`) REFERENCES `Atividade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MembrosAtividade` ADD CONSTRAINT `MembrosAtividade_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MembrosMinisterios` ADD CONSTRAINT `MembrosMinisterios_ministerio_id_fkey` FOREIGN KEY (`ministerio_id`) REFERENCES `Ministerio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MembrosMinisterios` ADD CONSTRAINT `MembrosMinisterios_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Escala` ADD CONSTRAINT `Escala_eventos_id_fkey` FOREIGN KEY (`eventos_id`) REFERENCES `Eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Escala` ADD CONSTRAINT `Escala_ministerio_id_fkey` FOREIGN KEY (`ministerio_id`) REFERENCES `Ministerio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Escala` ADD CONSTRAINT `Escala_atividade_id_fkey` FOREIGN KEY (`atividade_id`) REFERENCES `Atividade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participacao` ADD CONSTRAINT `Participacao_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participacao` ADD CONSTRAINT `Participacao_escala_id_fkey` FOREIGN KEY (`escala_id`) REFERENCES `Escala`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
