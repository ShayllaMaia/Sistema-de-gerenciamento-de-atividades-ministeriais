import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres";

const prisma = new PrismaClient();

const retrieveAtividadeService = async (id, token) => {
  token = await retornaInfoToken(token);
  if (!id) throw new AppError("Dados inválidos", 401);

  const atividade = prisma.atividade.findUnique({
    where: { id },
  });

  if (!atividade) throw new AppError("Atividade não encontrada", 404);

  return atividade;
};

export { retrieveAtividadeService };
