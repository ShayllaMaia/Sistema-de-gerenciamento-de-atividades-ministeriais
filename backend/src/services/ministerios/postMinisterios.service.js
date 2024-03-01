import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const postMinisterioService = async (data, token) => {
  let { nome, descricao } = data;

  token = await retornaInfoToken(token);

  const tipoUsuario = await retornaTipoUsuario(token);

  if (tipoUsuario.tipoUsuario != "ADMIN") throw new AppError("Acesso não autorizado: Somente admin pode criar ministérios", 401)
  const ministerioJaExiste = await prisma.ministerio.findUnique({
    where: {
      nome: nome,
    },
  });
  if (ministerioJaExiste) {
    throw new AppError("O ministério já existe!", 400);
  }

  const novoMinisterio = await prisma.ministerio.create({
    data: {
      nome: nome,
      descricao: descricao,
    },
  });
  return novoMinisterio;
  // }
};

export { postMinisterioService };