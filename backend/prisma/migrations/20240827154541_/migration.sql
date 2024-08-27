-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('NORMAL', 'LIDER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TipoEvento" AS ENUM ('CULTO', 'EVENTO');

-- CreateTable
CREATE TABLE "Ministerio" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Ministerio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MinisterioLider" (
    "ministerio_id" TEXT NOT NULL,
    "lider_id" TEXT NOT NULL,

    CONSTRAINT "MinisterioLider_pkey" PRIMARY KEY ("ministerio_id","lider_id")
);

-- CreateTable
CREATE TABLE "Atividade" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "ministerio_id" TEXT NOT NULL,

    CONSTRAINT "Atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembrosAtividade" (
    "atividade_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "MembrosAtividade_pkey" PRIMARY KEY ("atividade_id","usuario_id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "senha" TEXT NOT NULL,
    "tipoUsuario" "TipoUsuario" NOT NULL DEFAULT 'NORMAL',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembrosMinisterios" (
    "id" TEXT NOT NULL,
    "ministerio_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "preferenciasAtividades" JSONB NOT NULL,

    CONSTRAINT "MembrosMinisterios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eventos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "tipoEvento" "TipoEvento" NOT NULL DEFAULT 'CULTO',
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_fim" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT,
    "isRecorrente" BOOLEAN NOT NULL,

    CONSTRAINT "Eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escala" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "eventos_id" TEXT NOT NULL,
    "ministerio_id" TEXT NOT NULL,
    "atividade_id" TEXT NOT NULL,
    "recorrente" BOOLEAN NOT NULL,
    "dia_semana" INTEGER NOT NULL,

    CONSTRAINT "Escala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participacao" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "escala_id" TEXT NOT NULL,

    CONSTRAINT "Participacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ministerio_nome_key" ON "Ministerio"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Atividade_nome_key" ON "Atividade"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "MinisterioLider" ADD CONSTRAINT "MinisterioLider_ministerio_id_fkey" FOREIGN KEY ("ministerio_id") REFERENCES "Ministerio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MinisterioLider" ADD CONSTRAINT "MinisterioLider_lider_id_fkey" FOREIGN KEY ("lider_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_ministerio_id_fkey" FOREIGN KEY ("ministerio_id") REFERENCES "Ministerio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembrosAtividade" ADD CONSTRAINT "MembrosAtividade_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "Atividade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembrosAtividade" ADD CONSTRAINT "MembrosAtividade_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembrosMinisterios" ADD CONSTRAINT "MembrosMinisterios_ministerio_id_fkey" FOREIGN KEY ("ministerio_id") REFERENCES "Ministerio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembrosMinisterios" ADD CONSTRAINT "MembrosMinisterios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala" ADD CONSTRAINT "Escala_eventos_id_fkey" FOREIGN KEY ("eventos_id") REFERENCES "Eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala" ADD CONSTRAINT "Escala_ministerio_id_fkey" FOREIGN KEY ("ministerio_id") REFERENCES "Ministerio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala" ADD CONSTRAINT "Escala_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "Atividade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participacao" ADD CONSTRAINT "Participacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participacao" ADD CONSTRAINT "Participacao_escala_id_fkey" FOREIGN KEY ("escala_id") REFERENCES "Escala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
