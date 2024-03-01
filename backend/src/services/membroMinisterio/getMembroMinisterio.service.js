import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();

const getMembroMinisterioService = async (token) => {
    token = await retornaInfoToken(token);

    const membrosMinisterio = await prisma.membrosMinisterios.findMany({
        include: {
            usuario: true,
            ministerio: true
        },
    });

    return membrosMinisterio;
    
};
export { getMembroMinisterioService };