import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();

const getUsuariosService = async (token) => {
  token = await retornaInfoToken(token);
  const usuarios = prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      telefone: true,
      endereco: true,
      dataNascimento: true,
      tipoUsuario: true,
    },
  });
    
    return usuarios;
    
};

export { getUsuariosService };