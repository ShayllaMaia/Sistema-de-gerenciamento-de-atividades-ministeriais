import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const deletarPreferenciasHorariosByUserIdService = async (id, token) => {
  // Valida o token, caso necessário para autorização
  token = await retornaInfoToken(token);

  // Busca todas as preferências de horários associadas ao usuário
  const preferencias = await prisma.preferenciasHorarios.findMany({
    where: {
      id: id,
    },
  });

  // Verifica se as preferências foram encontradas
  if (preferencias.length === 0) {
    throw new AppError("Preferências de horários não encontradas", 404); // Lança o erro corretamente
  }

  // Se as preferências existirem, realiza a exclusão
  await prisma.preferenciasHorarios.deleteMany({
    where: {
      id: id,
    },
  });

  return true; // Retorna um valor indicativo de sucesso
};

export { deletarPreferenciasHorariosByUserIdService };
