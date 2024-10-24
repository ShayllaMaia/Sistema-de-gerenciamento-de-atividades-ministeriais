import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();

const getEventosService = async (token) => {
  // Obter as informações do token
  token = await retornaInfoToken(token);

  // Buscar eventos e incluir ministérios associados através do modelo EventoMinisterio
  const eventos = await prisma.eventos.findMany({
    include: {
      ministerios: {  // Relacionamento definido como 'ministerios' no modelo Eventos
        include: {
          ministerio: true // Inclui as informações completas do ministério associado
        }
      }
    }
  });
  console.log("Eventos encontrados:", eventos);
  return eventos;
};

export { getEventosService };
