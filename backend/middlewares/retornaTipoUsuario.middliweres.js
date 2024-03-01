import { PrismaClient } from "@prisma/client";
import { AppError } from "../src/errors/appError.js";

const prisma = new PrismaClient();

const retornaTipoUsuario = async(id)=>{
  
    const tipoUsuario = await prisma.usuario.findUnique({
        where:{
          id: id,
        },
        select:{
          tipoUsuario: true,
        }
      });
      return tipoUsuario;
};
export { retornaTipoUsuario };