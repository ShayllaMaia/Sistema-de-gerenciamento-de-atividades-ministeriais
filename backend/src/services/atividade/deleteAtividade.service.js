import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const deleteAtividadeService = async (id, token) => {

  token = await retornaInfoToken(token);

  const tipoUsuario = await retornaTipoUsuario(token);

  if (tipoUsuario.tipoUsuario == "NORMAL") throw new AppError("Acesso não autorizado: Somente admin e lideres pode deletar uma atividade", 401);

  const atividade = await prisma.atividade.findUnique({
    where: { id },
  });

  if (!atividade) throw new AppError("Atividade não encontrada", 404);

  return prisma.atividade.delete({
    where: { id },
  });
};
export { deleteAtividadeService };
