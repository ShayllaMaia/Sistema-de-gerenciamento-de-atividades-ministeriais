import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMembroMinisterioService = async () => {

    const membrosMinisterio = await prisma.membrosMinisterios.findMany({
        include: {
            usuario: true,
            ministerio: true
        },
    });

    return membrosMinisterio;
    
};
export { getMembroMinisterioService };