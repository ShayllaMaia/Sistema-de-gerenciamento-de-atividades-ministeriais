import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const postMinisterioService = async (data) => {
  let{ nome, descricao, lider_id } = data;
  let lider = ""
  const ministerioJaExiste = await prisma.ministerio.findUnique({
    where: {
      nome: nome,
    },
  });
  if(lider_id){
    lider = await prisma.usuario.findUnique({
      where: {
        id: lider_id,
      },
    },
    
    );
    if(!lider){
      throw new AppError("Líder não encontrado!", 404);
    }
  }

  if (ministerioJaExiste) {
    throw new AppError("O ministério já existe!", 400);
  }
  
  console.log(lider)
  const novoMinisterio = await prisma.ministerio.create({
     data:{
      nome: nome,
      descricao: descricao,
      lider_id: lider,
    },
  });

  return novoMinisterio;
};

export { postMinisterioService };