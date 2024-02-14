import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarAtivadadeService = async (nome, descricao) => {
    return prisma.atividade.create({
        data: {
            nome,
            descricao
        }
    });
}
