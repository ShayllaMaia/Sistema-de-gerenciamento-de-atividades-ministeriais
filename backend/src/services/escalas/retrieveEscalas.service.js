import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

 const getParticipacoes = async (req, res) => {
  try {
    // Buscar todas as participações e incluir relacionamentos
    const participacoes = await prisma.participacao.findMany({
      include: {
        evento: true,        // Inclui informações do evento
        ministerio: true,    // Inclui informações do ministério
        atividade: true,     // Inclui informações da atividade
        usuario: {
          include: {
            preferenciasHorarios: true, // Inclui preferências de horários do usuário
          },
        },
      },
    });
    console.log("Participações encontradas:", participacoes);
    // Retornar as participações com os relacionamentos incluídos
   return participacoes;
  } catch (error) {
    console.error("Erro ao buscar participações:", error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao buscar participações',
    });
  }
};
export { getParticipacoes };
