import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMembroMinisterioService = async () => {

    const membrosMinisterio = await prisma.membrosMinisterios.findMany();

    return membrosMinisterio;
    
};
export { getMembroMinisterioService };