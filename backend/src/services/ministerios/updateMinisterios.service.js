import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const updateMinisterioService = async (id, data, token) => {
  const ministerioId = id;
  token = await retornaInfoToken(token);
  const tipoUsuario = await retornaTipoUsuario(token);
  if (tipoUsuario.tipoUsuario != "ADMIN") throw new AppError("Acesso não autorizado: Somente admin pode modificar um ministério", 401);

  const ministerio = await prisma.ministerio.findUnique({
    where: {
      id: ministerioId,
    },
  });

  if (!ministerio) {
    throw new AppError("Ministério não encontrado!", 404);
  }


  const updatedMinisterio = await prisma.ministerio.update({
    where: {
      id: ministerioId,
    },
    data: {
      nome: data.nome,
      descricao: data.descricao
    }
  });
  return updatedMinisterio;
}

export { updateMinisterioService };