/*
  Warnings:

  - You are about to drop the `DiaSemana` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DiaSemana" DROP CONSTRAINT "DiaSemana_evento_id_fkey";

-- DropTable
DROP TABLE "DiaSemana";

-- CreateTable
CREATE TABLE "PreferenciasHorarios" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "dia_semana" "Dias" NOT NULL,
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_fim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PreferenciasHorarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PreferenciasHorarios" ADD CONSTRAINT "PreferenciasHorarios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
