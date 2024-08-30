import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/appError.js";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const loginUsuarioService = async (senha, email) => {
  
  const usuario = await prisma.usuario.findUnique({
    where: {
      email: email,
    },
  });
  
  if (!usuario) {
    throw new AppError("Usuário não encontrado", 404);
  }

  //verificando se o usuário existe e se a senha está correta
  if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
    //gera um token com base numa chave secreta
    const token = jwt.sign({
      usuario_id: usuario.id,
    }, process.env.SECRET);

    return token;
  }

  //lança um erro caso a senha esteja incorreta
  throw new AppError("Usuário ou senha incorretos", 401);
};
export { loginUsuarioService };
