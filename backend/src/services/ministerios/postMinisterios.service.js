import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const postMinisterioService = async (data) => {
  let{ nome, descricao, lider_id } = data;

  const ministerioJaExiste = await prisma.ministerio.findUnique({
    where: {
      nome: nome,
    },
  });

  if (ministerioJaExiste) {
    throw new AppError("O ministério já existe!", 400);
  }

  const novoMinisterio = await prisma.ministerio.create({
     data:{
      nome: nome,
      descricao: descricao,
      lider_id: lider_id || null,
    },
  });

  return novoMinisterio;
};

export { postMinisterioService };