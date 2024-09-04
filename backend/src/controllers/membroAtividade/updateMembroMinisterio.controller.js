import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateMembroMinisterioService = async (data) => {
    const { idMembro, idMinisterio, preferenciasAtividades } = data;

    const membroMinisterio = await prisma.membrosMinisterios.findFirst({
        where: {
            usuario_id: idMembro,
            ministerio_id: idMinisterio
        },
        select: {
            id: true,
            preferenciasAtividades: true
        }
    });

    if (!membroMinisterio) {
        return false;
    }

    await prisma.membrosMinisterios.update({
        where: {
            id: membroMinisterio.id
        },
        data: {
            preferenciasAtividades: preferenciasAtividades
        }
    });

    return true;
}