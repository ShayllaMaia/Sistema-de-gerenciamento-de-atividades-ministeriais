import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const postMembroMinisterioService = async (data) => {
  let{ usuarioId, ministerioId } = data;

  const usuario = await prisma.usuario.findUnique({
    where: {
      id: usuarioId,
    },
  });
  const ministerio = await prisma.ministerio.findUnique({
    where: {
      id: ministerioId,
    },
  });

  if(!usuario || !ministerio){
    throw new AppError("Usuário ou ministério não encontrado!", 404);
  }

  const novoMembroMinisterio = await prisma.membrosMinisterios.create({
    data:{
      usuario_id: {
        connect:usuario.id
      }},
        ministerio_id: {
            connect: ministerio.id
        },
  });

  return novoMembroMinisterio;
};

export { postMembroMinisterioService};