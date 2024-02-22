import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const postAtivadadeService = async (data) => {
  const {nome, descricao,ministerio_id} = data;


  if(!ministerio_id) throw new AppError("atividade deve ser atrelada a um ministerio", 404);

  

  const novaAtividade =  prisma.atividade.create({
    data: {
      nome:nome,
      descricao: descricao,
      ministerio: {
        connect: { id: ministerio_id } 
      },
    },
    include: {
      ministerio: true,
    }
  });
  return novaAtividade;
};
export { postAtivadadeService };
