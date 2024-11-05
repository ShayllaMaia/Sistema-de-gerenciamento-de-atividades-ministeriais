import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const deleteEscalaService = async (id) => {
    const escala = await prisma.participacao.delete({
        where: {
            id: id,
        },
    });

    if (!escala) {
        throw new AppError("Escala não encontrada", 404);
    }

    return true;
};

export { deleteEscalaService };
