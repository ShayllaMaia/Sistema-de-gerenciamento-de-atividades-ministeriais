import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();
const getMinisterioLiderService = async (token) => {
  try {
    token = await retornaInfoToken(token);
    const ministeriosLiderados = await prisma.ministerioLider.findMany({
      include: {
        ministerio: true,
        lider: {
          select: {
            nome: true,
          },
        }, // Inclui as informações do ministério
      },
    });

    console.log("Consulta aos ministérios liderados:", ministeriosLiderados);

    if (ministeriosLiderados.length === 0) {
      console.log("Nenhum ministério encontrado para o líder:", liderId);
      throw new Error("Ministério não encontrado!");
    }

    return ministeriosLiderados;
  } catch (error) {
    console.error("Erro no serviço:", error.message);
    throw error;
  }
};

export { getMinisterioLiderService };
