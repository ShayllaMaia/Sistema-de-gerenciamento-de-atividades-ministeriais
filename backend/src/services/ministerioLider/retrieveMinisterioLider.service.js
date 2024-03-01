import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();

const retrieveMinisterioLiderService = async (ministerioId, token) => {
    // Verifica se o ministério existe
    token = await retornaInfoToken(token);
    const ministerio = await prisma.ministerio.findUnique({
        where: {
            id: ministerioId,
        },
    });

    if (!ministerio) {
        throw new AppError("Ministério não encontrado!", 404);
    }

    // Busca os líderes associados ao ministério pelo ID do ministério
    const lideres = await prisma.ministerioLider.findMany({
        where: {
            ministerio_id: ministerioId,
        },
        include: {
            ministerio: true, // Isso incluirá todos os detalhes do ministério associado ao líder
            lider: true, // Isso incluirá todos os detalhes dos líderes associados ao ministério
        },
    });

    return lideres;
};

export { retrieveMinisterioLiderService };
