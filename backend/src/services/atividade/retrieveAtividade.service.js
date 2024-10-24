import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const retrieveAtividadeService = async (id, token) => {
  // Valida o token
  token = await retornaInfoToken(token);
  if (!id) throw new AppError("Dados inválidos", 401);

  // Busca a atividade pelo ID
  const atividade = await prisma.atividade.findUnique({
    where: { id },
  });

  if (!atividade) throw new AppError("Atividade não encontrada", 404);

  // Busca os membros que têm qualquer preferência de atividade
  let membros = await prisma.membrosMinisterios.findMany({
    where: {
      statusSolicitacao: "APROVADO",
    },
    include: {
      usuario: true, // Inclui os dados do usuário relacionados
    },
  });

  // Filtra manualmente os membros que têm a atividade específica nas preferências
  membros = membros.filter(membro => {
    const preferencias = membro.preferenciasAtividades;
    // Verifica se a atividade com o ID fornecido está nas preferências
    return preferencias.some(preferencia => preferencia.id === id);
  });

  // Retorna a atividade junto com os membros que têm essa atividade como preferência
  return {
    atividade,
    membros,
  };
};

export { retrieveAtividadeService };
