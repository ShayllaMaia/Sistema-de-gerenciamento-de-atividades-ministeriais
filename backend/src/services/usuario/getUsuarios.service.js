import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsuariosService = async () => {
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