import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMinisteriosService = async () => {
  const ministerios = await prisma.ministerio.findMany();

  return ministerios;
};

export { getMinisteriosService };