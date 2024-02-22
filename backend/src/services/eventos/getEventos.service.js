import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getEventosService = async() => {
    const eventos = prisma.eventos.findMany();
    return eventos;
}

export {getEventosService};