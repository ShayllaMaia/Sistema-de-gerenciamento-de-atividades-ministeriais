import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listarAtividadeService = async () => {
    return prisma.atividade.findMany();
};
