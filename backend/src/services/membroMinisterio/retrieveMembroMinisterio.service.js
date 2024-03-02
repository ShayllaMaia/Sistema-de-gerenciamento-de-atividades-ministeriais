import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();

const retrieveMembroMinisterioService = async (ministerio_id, token) => {

    token = await retornaInfoToken(token);
    const ministerio = await prisma.ministerio.findUnique({
        where: {
            id: ministerio_id,
        },
    });
    if (!ministerio) {
        throw new AppError("Ministério não encontrado!", 404);
    }

    //buscando todos os membros de um ministério
    const membrosMinisterios = await prisma.membrosMinisterios.findMany({
        where: {
            ministerio_id: ministerio_id,
        },
        include: {
            usuario: true,
            ministerio: true
        },
    });

    return membrosMinisterios;
};

export { retrieveMembroMinisterioService };
