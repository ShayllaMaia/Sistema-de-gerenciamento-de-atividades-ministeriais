import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMinisterioLiderService = async () => {
    const membrosMinisterio = await prisma.ministerioLider.findMany({
        include: {
            usuario: true,
            ministerio: true
        },
        include:{
            lider: true,
            ministerio: true
        }
    });

    return membrosMinisterio;
};

export { getMinisterioLiderService };
