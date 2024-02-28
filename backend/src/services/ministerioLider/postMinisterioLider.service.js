import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const postMinisterioLiderService = async (data) => {
    const { ministerio_id, lideres_ids } = data;
  
    const ministerio = await prisma.ministerio.findUnique({
      where: {
        id: ministerio_id,
      },
    });
  
    if (!ministerio) {
      throw new AppError("Ministério não encontrado!", 404);
    }
    const lideres = await prisma.usuario.findMany({
      where: {
        id: {
          in: lideres_ids,
        },
      },
    });
    
  
    if (lideres.length <1) {
      throw new AppError("Um ou mais líderes não foram encontrados!", 404);
    }
  
    await prisma.ministerioLider.createMany({
      data: lideres.map((lider) => ({  // Mapeie para extrair apenas o ID do líder
        ministerio_id: ministerio_id,
        lider_id: lider.id,
      })),
    });
  
    return { ministerio, lideres };
  };
  
  export { postMinisterioLiderService };