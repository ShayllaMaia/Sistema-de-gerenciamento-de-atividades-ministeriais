import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const postAtivadadeService = async (data, token) => {
  const { nome, descricao, ministerio_id } = data;
  const secreto = process.env.SECRET;
  if (!token) throw new AppError("Acesso não autorizado", 401);
  const usuario = jwt.verify(token, secreto);
  usuario.toString();

  const tipoUsuario = await prisma.usuario.findUnique({
    where: {
      id: usuario.usuario_id,
    },
    select: {
      tipoUsuario: true,
    }
  })

  if(tipoUsuario.tipoUsuario == "NORMAL") throw new AppError("Acesso não autorizado:Somente lideres e admim podem criar atividades", 401);

  if (!nome || !descricao || !ministerio_id) throw new AppError("Dados inválidos", 401);


  const atividadeJaExiste = await prisma.atividade.findUnique({
    where: {
      nome: nome,
    },
  });
  if (atividadeJaExiste) throw new AppError("Atividade já existe", 401);

  const ministerio = await prisma.ministerio.findUnique({
    where: {
      id: ministerio_id,
    },
  });

  if (!ministerio) throw new AppError("atividade deve ser atrelada a um ministerio", 411);



  const novaAtividade = prisma.atividade.create({
    data: {
      nome: nome,
      descricao: descricao,
      ministerio: {
        connect: { id: ministerio.id }
      },
    },
    include: {
      ministerio: true,
    }
  });
  return novaAtividade;
};
export { postAtivadadeService };
