/*
  Warnings:

  - Made the column `dataNascimento` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Usuario` MODIFY `dataNascimento` DATETIME(3) NOT NULL;
