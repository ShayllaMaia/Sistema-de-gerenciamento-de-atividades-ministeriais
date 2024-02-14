import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
const prisma = new PrismaClient();

export const atualizarAtivadadeService = async (id, nome, descricao) => {
    const atividade = await prisma.atividade.findUnique({
        where: { id }        
    });

    if (!atividade) throw new AppError("Atividade não encontrada", 404);    

    return prisma.atividade.update({
        where: { id },
        data: {
            nome,
            descricao
        }
    });;
}
