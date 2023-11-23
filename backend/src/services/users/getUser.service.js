import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getUserService = async () => {

    const users = prisma.user.findMany();

    return users;
};

export { getUserService };