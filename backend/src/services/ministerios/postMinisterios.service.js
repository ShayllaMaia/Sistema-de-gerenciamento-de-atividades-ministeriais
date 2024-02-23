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

  // if(lider_id){
  //   const lider = await prisma.usuario.findUnique({
  //     where: {
  //       id: lider_id,
  //     },
  //   },
  //   );
    
  //   const updateLider = await prisma.usuario.update({
  //     where: {
  //       id: lider.id,
  //     },
  //     data: {
  //       tipoUsuario: "LIDER",
  //     }
  //   })
  //   if(!lider){
  //     throw new AppError("Líder não encontrado!", 404);
  //   }
    const novoMinisterio = await prisma.ministerio.create({
      data:{
       nome: nome,
       descricao: descricao,
      //  lider_id: updateLider,
     },
   });
   return novoMinisterio;
  // }
};

export { postMinisterioService };