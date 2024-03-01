import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const updateUsuarioService = async (id, data) => {
    const usuarioId = parseInt(id);
    
    const usuario = await prisma.usuario.findUnique({
        where: {
            id:usuarioId,
        }
    });

    if(!usuario){
        throw new AppError("Usuário não encontrado",404);
    }

    if(data.senha){
        data.senha = await bcrypt.hash(data.senha,8);
    }

    const updateUsuario = await prisma.usuario.update({
        where:{
            id: usuario.id,
        },
        data:data,
    });

    return updateUsuario;
};

export {updateUsuarioService};