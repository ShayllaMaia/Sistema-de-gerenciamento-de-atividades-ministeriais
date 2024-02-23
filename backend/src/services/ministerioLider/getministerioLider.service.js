import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMinisterioLiderService = async () => {

    const membrosMinisterio = await prisma.ministerioLider.findMany();

    return membrosMinisterio;
    
};
export { getMinisterioLiderService };