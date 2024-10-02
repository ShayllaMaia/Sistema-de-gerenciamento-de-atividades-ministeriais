import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const deleteMinisterioService = async (id, token) => {
  token = await retornaInfoToken(token);
  const tipoUsuario = await retornaTipoUsuario(token);
  
  if (tipoUsuario.tipoUsuario !== "ADMIN") {
    throw new AppError("Acesso não autorizado: Somente administradores ou líderes podem deletar um ministério", 401);
}

  const ministerio = await prisma.ministerio.delete({
    where: {
      id: id,
    },
  });

  if (!ministerio) {
    throw new AppError("Ministério não encontrado!", 404);
  }

  return true;
};

export { deleteMinisterioService };