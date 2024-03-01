/*
  Warnings:

  - You are about to drop the column `lider_id` on the `Ministerio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `Atividade` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isRecorrente` to the `Eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Eventos` ADD COLUMN `isRecorrente` BOOLEAN NOT NULL,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Ministerio` DROP COLUMN `lider_id`;

-- CreateTable
CREATE TABLE `MinisterioLider` (
    `ministerio_id` VARCHAR(191) NOT NULL,
    `lider_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ministerio_id`, `lider_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MembrosAtividade` (
    `atividade_id` VARCHAR(191) NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`atividade_id`, `usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Atividade_nome_key` ON `Atividade`(`nome`);

-- AddForeignKey
ALTER TABLE `MinisterioLider` ADD CONSTRAINT `MinisterioLider_ministerio_id_fkey` FOREIGN KEY (`ministerio_id`) REFERENCES `Ministerio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MinisterioLider` ADD CONSTRAINT `MinisterioLider_lider_id_fkey` FOREIGN KEY (`lider_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MembrosAtividade` ADD CONSTRAINT `MembrosAtividade_atividade_id_fkey` FOREIGN KEY (`atividade_id`) REFERENCES `Atividade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MembrosAtividade` ADD CONSTRAINT `MembrosAtividade_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
