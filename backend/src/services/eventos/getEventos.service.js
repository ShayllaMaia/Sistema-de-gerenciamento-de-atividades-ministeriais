import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();

const getEventosService = async (token) => {
    token = await retornaInfoToken(token);

    const eventos = prisma.eventos.findMany();
    return eventos;
}

export { getEventosService };