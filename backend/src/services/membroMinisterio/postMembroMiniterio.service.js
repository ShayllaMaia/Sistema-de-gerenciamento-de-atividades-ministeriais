import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const postMembroMinisterioService = async (data) => {

  let{ usuario_id, ministerio_id, preferenciasAtividades } = data;

  const usuario = await prisma.usuario.findUnique({
    where: {
      id: usuario_id,
    },
  });

  const ministerio = await prisma.ministerio.findUnique({
    where: {
      id: ministerio_id,
    },
  });

  if(!usuario || !ministerio){
    throw new AppError("Usuário ou ministério não encontrado!", 404);
  }
  if(!preferenciasAtividades) throw new AppError("deve ter atividades preferenciais", 401)
  
  //substituindo os id por objetos correspondentes a cada atividade
for (let i = 0; i < preferenciasAtividades.length; i++) {
  const atividadeId = preferenciasAtividades[i];
  const atividade = await prisma.atividade.findUnique({
    where: {
      id: atividadeId
    }
  });
  preferenciasAtividades[i] = atividade;
}

const novoMembroMinisterio = await prisma.membrosMinisterios.create({
  data: {
    usuario: {
      connect: { id: usuario_id } 
    },
    ministerio: {
      connect: { id: ministerio_id } 
    },
    preferenciasAtividades: preferenciasAtividades
  },
  include: {
    usuario: true,
    ministerio: true,
    
  }
});


  return novoMembroMinisterio;
};

export { postMembroMinisterioService};