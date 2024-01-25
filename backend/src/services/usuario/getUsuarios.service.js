import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsuariosService = async () => {

    const usuarios = prisma.usuario.findMany();

    return usuarios;
};

export { getUsuariosService };