import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();

const getMinisteriosService = async (token) => {
  token = await retornaInfoToken(token);

  const ministerios = await prisma.ministerio.findMany();
  if (!ministerios) {
    throw new AppError("Ministério não encontrado!", 404);
  }

  return ministerios;
};

export { getMinisteriosService };