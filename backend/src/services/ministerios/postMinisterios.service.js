import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const postMinisterioService = async (data) => {
  let{ nome, descricao } = data;

  const secreto = process.env.SECRET;
  if(!token) throw new AppError("Acesso não autorizado",401);
  const usuario = jwt.verify(token,secreto);
  
  usuario.toString();
  console.log(usuario)
  const tipoUsuario = await prisma.usuario.findUnique({
    where:{
      id: usuario.usuario_id,
    },
    select:{
      tipoUsuario: true,
    }
  })

  if( tipoUsuario.tipoUsuario != "ADMIN") throw new AppError("Acesso não autorizado: Somente admin pode criar ministérios",401)
  const ministerioJaExiste = await prisma.ministerio.findUnique({
    where: {
      nome: nome,
    },
  });
  if (ministerioJaExiste) {
    throw new AppError("O ministério já existe!", 400);
  }

    const novoMinisterio = await prisma.ministerio.create({
      data:{
       nome: nome,
       descricao: descricao,
     },
   });
   return novoMinisterio;
  // }
};

export { postMinisterioService };