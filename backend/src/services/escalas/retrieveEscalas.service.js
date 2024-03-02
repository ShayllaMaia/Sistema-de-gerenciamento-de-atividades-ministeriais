import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const retrieveEscalaService = async (id) => {
    const escala = await prisma.escala.findUnique({
        where: {
            id: parseInt(id),
        },
        select: {
            id: true,
            data: true,
            recorrente: true,
            dia_semana: true,
            evento_id: true,
        },
    });

    if (!escala) {
        throw new AppError("Escala não encontrada", 404);
    }

    return escala;
};

export { retrieveEscalaService };
