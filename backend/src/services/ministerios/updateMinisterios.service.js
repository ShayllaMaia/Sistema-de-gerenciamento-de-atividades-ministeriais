import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const updateMinisterioService = async (id, data) => {
  const ministerioId = id;

  const ministerio = await prisma.ministerio.findUnique({
    where: {
      id: ministerioId,
    },
  });
  
  if (!ministerio) {
    throw new AppError("Ministério não encontrado!", 404);
  }

  if(data.lider_id == ministerio.lider_id["id"]){
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
  } else{
    await prisma.usuario.update({
      where:{
        id: ministerio.lider_id["id"],
      },
      data:{
        tipoUsuario: "NORMAL"
      }
    })
    const novoLider = await prisma.usuario.findUnique({
      where: {
        id: data.lider_id,
      }
    })

    if(!novoLider){
      throw new AppError("Líder não encontrado!", 404);
    }
    
    const novoLiderUpdate = await prisma.usuario.update({
      where:{
        id: data.lider_id,
      },
      data:{
        tipoUsuario: "LIDER"
      }
    })
    
    const updatedMinisterio = await prisma.ministerio.update({
      where:{
        id: ministerioId,
      },
      data: {
        nome:data.nome,
        descricao: data.descricao,
        lider_id: novoLiderUpdate,
      }
    })
    return updatedMinisterio;
  }
};

export { updateMinisterioService };