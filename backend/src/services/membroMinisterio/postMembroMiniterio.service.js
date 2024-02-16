import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const postMembroMinisterioService = async (data) => {
  let{ usuarioId, ministerioId } = data;
// console.log(data);
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
    data: {
      usuario: {
        connect: { id: usuario.id }
      },
      ministerio: {
        connect: { id: ministerio.id } 
      }
    },
    include: {
      ministerio: true,
      usuario: true
    }
  });
  

  return novoMembroMinisterio;
};

export { postMembroMinisterioService};