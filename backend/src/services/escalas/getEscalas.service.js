import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getEscalasService = async () => {
    const escalas = await prisma.escala.findMany({
        select: {
            id: true,
            data: true,
            recorrente: true,
            dia_semana: true,
            evento_id: true,
        },
    });

    return escalas;
};

export { getEscalasService };
