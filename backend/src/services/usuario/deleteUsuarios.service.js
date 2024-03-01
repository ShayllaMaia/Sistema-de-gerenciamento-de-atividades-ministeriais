import {PrismaClient} from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();

const deleteUsuarioService =  async (id,token) => {
    token = await retornaInfoToken(token);
    const usuario = await prisma.usuario.delete({
        where: {
            id:id,
        },
    });

    if(!usuario){
        throw new AppError("Usuário não encontrado",404);
    }

    return true;
}

export {deleteUsuarioService};