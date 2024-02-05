import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
const prisma = new PrismaClient();

const retrieveUsuariosService = async (id) =>{
    const usuario = await prisma.usuario.findUnique({
        where:{
            id: parseInt(id),
        },
        select:{
            id: true,
            nome: true,
            email: true,
            telefone:true,
            endereco:true,
            dataNascimento:true
        }
    });
    console.log(usuario)
    if(!usuario){
        
        throw new AppError("Usuário não encontrado",404);
    }
    return usuario;
}

export {retrieveUsuariosService};