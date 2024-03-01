import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const updateEscalaService = async (id, data) => {
    const escala = await prisma.escala.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!escala) {
        throw new AppError("Escala não encontrada", 404);
    }

    const updatedEscala = await prisma.escala.update({
        where: {
            id: parseInt(id),
        },
        data: data,
    });

    return updatedEscala;
};

export { updateEscalaService };
