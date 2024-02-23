import { PrismaClient } from "@prisma/client";

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
  
    if (lideres.length !== lideres_ids.length) {
      throw new AppError("Um ou mais líderes não foram encontrados!", 404);
    }
  
    await prisma.ministerioLider.createMany({
      data: lideres_ids.map((id) => ({
        ministerio_id: ministerio_id,
        lider_id: id, // Adicione o campo 'lider_id' ao objeto 'data'
      })),
    });
  
    return { ministerio, lideres };
  };
  
  export { postMinisterioLiderService };