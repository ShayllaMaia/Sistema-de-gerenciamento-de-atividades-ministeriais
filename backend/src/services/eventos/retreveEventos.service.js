import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const retrieveEventosService = async (id) => {
  const evento = await prisma.eventos.findUnique({
    where: {
      id: id,
    },
  });

  if (!evento) {
    throw new AppError("Ministério não encontrado!", 404);
  }

  return evento;
};

export { retrieveEventosService };