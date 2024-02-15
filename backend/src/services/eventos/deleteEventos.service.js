import { PrismaClient } from "@prisma/client";
import {AppError} from "../../errors/appError.js";

const prisma = new PrismaClient();

const deleteEventosService = async(id) => {
  
        const evento = await prisma.eventos.delete({
            where: {
                id: parseInt(id),
            },
        });
    
    return true;

}

export {deleteEventosService};