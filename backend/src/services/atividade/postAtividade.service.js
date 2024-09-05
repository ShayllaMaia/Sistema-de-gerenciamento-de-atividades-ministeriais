import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import jwt from "jsonwebtoken";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const postAtivadadeService = async (data, token) => {
  const { nome, descricao, ministerio_id,quantidadeMembros } = data;
  
  token = await retornaInfoToken(token);
  const tipoUsuario = await retornaTipoUsuario(token);

  if (tipoUsuario.tipoUsuario == "NORMAL") throw new AppError("Acesso não autorizado:Somente lideres e admim podem criar atividades", 401);

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

  const novaAtividade = await prisma.atividade.create({
    data: {
      nome: nome,
      descricao: descricao,
      ministerio_id: ministerio.id ,
      quantidadeMembros: quantidadeMembros,
    },
    
  });
  return novaAtividade;
};
export { postAtivadadeService };
