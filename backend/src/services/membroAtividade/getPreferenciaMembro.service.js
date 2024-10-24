import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const preferenciaMembroService = async (data, token) => {
    const { idMinisterio, idMembro } = data;

    const preferenciaMembroMinisterioAtividade = await prisma.membrosMinisterios.findMany({
        where: {
            usuario_id: idMembro,
            ministerio_id: idMinisterio
        },
        select: {
            preferenciasAtividades: true
        }
    });

    
    return preferenciaMembroMinisterioAtividade;
};

export { preferenciaMembroService };
