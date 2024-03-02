import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();

const getMinisterioLiderService = async (token) => {
    token = await retornaInfoToken(token);
    const membrosMinisterio = await prisma.ministerioLider.findMany({
        include: {
            usuario: true,
            ministerio: true
        },
        include:{
            lider: true,
            ministerio: true
        }
    });

    return membrosMinisterio;
};

export { getMinisterioLiderService };
