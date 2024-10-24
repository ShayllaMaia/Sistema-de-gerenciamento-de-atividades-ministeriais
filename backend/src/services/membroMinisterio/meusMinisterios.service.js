// Importação do Prisma Client
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const meusMinisteriosService = async (id,token)=>{

    console.log(id,token);
   // Buscar informações do usuário
  const usuario = await prisma.usuario.findUnique({
    where: { id: id },
  });

  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  // Caso o usuário seja ADMIN, retornar todos os ministérios
  if (usuario.tipoUsuario === 'ADMIN') {
    const ministerios = await prisma.ministerio.findMany();
    return {
      papel: 'ADMIN',
      ministerios,
    };
  }

  // Caso o usuário seja LÍDER, retornar os ministérios em que ele é líder
  if (usuario.tipoUsuario === 'LIDER') {
    const ministeriosLiderados = await prisma.ministerio.findMany({
      where: {
        lideres: {
          some: {
            lider_id: id,
          },
        },
      },
    });
    return {
      papel: 'LIDER',
      ministerios: ministeriosLiderados,
    };
  }

  // Caso o usuário seja MEMBRO comum, retornar os ministérios nos quais ele participa
  if (usuario.tipoUsuario === 'NORMAL') {
    const ministeriosMembro = await prisma.ministerio.findMany({
      where: {
        membros: {
          some: {
            usuario_id: id,
            statusSolicitacao: 'APROVADO', // Considerar apenas membros aprovados
          },
        },
      },
    });
    return {
      papel: 'MEMBRO',
      ministerios: ministeriosMembro,
    };
  }

  // Se nenhum papel foi identificado, retornar vazio
  return {
    papel: 'DESCONHECIDO',
    ministerios: [],
  };
};

export {meusMinisteriosService};