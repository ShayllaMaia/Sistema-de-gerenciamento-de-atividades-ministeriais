import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const updateMinisterioLiderService = async (id, data, token) => {
  const { liderEntrada, liderSaida } = data;

  token = await retornaInfoToken(token);

  const tipoUsuario = await retornaTipoUsuario(token);

  if (tipoUsuario.tipoUsuario != "ADMIN")
    throw new AppError(
      "Acesso não autorizado: somente admin pode fazer essa ação",
      401
    );

  const ministerio = await prisma.ministerio.findUnique({
    where: {
      id: id,
    },
  });

  if (!ministerio) {
    throw new AppError("Ministério não encontrado", 404);
  }
  if (liderEntrada.length == 0 && liderSaida.length == 0) {
    throw new AppError(
      "Você precisa apontar alguém para sair ou entrar no ministério",
      400
    );
  }
  const ministerioLideres = await prisma.ministerioLider.findMany({
    where: {
      ministerio_id: id,
    },
    select: {
      lider_id: true,
    },
  });

  const idLideres = ministerioLideres.map((lider) => lider.lider_id);

  let lideresConectadosEntrada = await prisma.ministerioLider.findMany({
    where:{
      lider_id:{
        in:liderEntrada,
      }
    },
    select:{
      lider_id:true,
    }
  })

  let lideresConectadosSaida = await prisma.ministerioLider.findMany({
    where:{
      lider_id:{
        in: liderSaida,
      }
    },
    select:{
      lider_id:true,
    }
  })
  console.log(lideresConectadosEntrada);
  console.log(lideresConectadosSaida);
  if(lideresConectadosEntrada.length === 0 || lideresConectadosSaida.length === idLideres.length){
    const liderEntradaMinisterio = await prisma.usuario.findMany({
      where: {
        id: {
          in: liderEntrada,
        },
      }
    });
    
    
  
    
    const ministerioLiderAdicionado = await prisma.ministerioLider.createMany({
      data: liderEntradaMinisterio.map((lider)=>({
        ministerio_id:id,
        lider_id:lider.id
      })),
    });
  
    await prisma.usuario.updateMany({
      where:{
        id:{
          in:liderEntrada,
        },
      },
      data:{
        tipoUsuario:"ADMIN"
      }
    })
    const liderSaidaMinisterio = await prisma.usuario.findMany({
      where: {
        id: {
          in: liderSaida,
        },
      },
    });
  
    await prisma.usuario.updateMany({
      where:{
        id:{
          in:liderSaida,
        },
      },
      data:{
        tipoUsuario:"NORMAL"
      }
    })
  
    const ministerioLiderRemovido = await prisma.ministerioLider.deleteMany({
      where: {
        ministerio_id: id,
        lider_id: {
          in: liderSaida,
        },
      },
    });
  
    return {ministerio,liderEntradaMinisterio,liderSaidaMinisterio};
  } else {
    throw new AppError("Você pode estar tentando adicionar um lider que já está em um ministério ou tentando tirar um lider que não está conectado a um ministerio",401)
  }
  
};

export { updateMinisterioLiderService };
