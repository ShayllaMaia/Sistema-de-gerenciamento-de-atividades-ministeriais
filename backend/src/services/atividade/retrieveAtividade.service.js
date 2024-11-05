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

  // Busca todos os membros aprovados
  let membros = await prisma.membrosMinisterios.findMany({
    where: {
      statusSolicitacao: "APROVADO",
    },
    include: {
      usuario: true, // Inclui os dados do usuário relacionados ao membro
    },
  });

  console.log("Membros encontrados com status APROVADO:", membros);

  // Filtra os membros que têm a atividade específica nas preferências
  membros = membros.filter(membro => {
    let preferencias = membro.preferenciasAtividades;

    // Se `preferenciasAtividades` for uma string JSON, parse para um array
    if (typeof preferencias === 'string') {
      try {
        preferencias = JSON.parse(preferencias);
        console.log(`Membro ID: ${membro.id} - Preferências Atividades após parse:`, preferencias);
      } catch (error) {
        console.error(`Erro ao parsear preferenciasAtividades para membro ${membro.id}:`, error);
        return false;
      }
    }

    // Verifica se `preferencias` é um array e se o ID da atividade está incluído
    if (Array.isArray(preferencias)) {
      // Se `preferencias` é um array de strings
      if (preferencias.includes(id)) {
        console.log(`Membro ID: ${membro.id} possui a atividade ${id} nas preferências (array de strings).`);
        return true;
      }

      // Se `preferencias` é um array de objetos com um campo `id`
      return preferencias.some(preferencia => preferencia.id === id);
    }

    return false;
  });

  console.log("Membros com a atividade nas preferências:", membros);

  // Retorna a atividade junto com os membros que têm essa atividade como preferência
  return {
    atividade,
    membros,
  };
};

export { retrieveAtividadeService };
