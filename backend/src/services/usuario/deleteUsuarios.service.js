import {PrismaClient} from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const deleteUsuarioService =  async (id) => {
    const usuarioId = parseInt(id);
    console.log(usuarioId)
    const usuario = await prisma.usuario.delete({
        where: {
            id: usuarioId,
        },
    });

    if(!usuario){
        throw new AppError("Usuário não encontrado",404);
    }

    return true;
}

export {deleteUsuarioService};