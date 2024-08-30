import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const gerarEscalaSemana = async () => {
  try {
    const hoje = new Date();
    const fimDaSemana = new Date(hoje);
    fimDaSemana.setDate(hoje.getDate() + (7 - hoje.getDay())); // Último dia da semana (domingo)

    // Obter todos os eventos da semana
    const eventos = await prisma.eventos.findMany({
      where: {
        data: {
          gte: hoje,
          lte: fimDaSemana
        }
      },
      include: {
        ministerios: {
          include: {
            ministerio: {
              include: {
                membros: {
                  include: {
                    usuario: true // Inclui dados do usuário/membro
                  }
                },
                atividadesMinisterio: {
                  include: {
                    atividade: true // Inclui dados da atividade
                  }
                }
              }
            }
          }
        }
      }
    });

    // Preparar a escala e criar participações
    const escalaSemana = [];

    for (const evento of eventos) {
      const { id: eventoId, hora_inicio: horaInicio } = evento;
      const dataEvento = evento.data || new Date();
      const mes = dataEvento.toLocaleString('default', { month: 'long' });

      const escalaEvento = {
        evento: evento.nome,
        data: dataEvento.toLocaleDateString(),
        ministerios: []
      };

      for (const eventoMinisterio of evento.ministerios) {
        const ministerio = eventoMinisterio.ministerio;
        const membros = ministerio.membros;
        const atividades = ministerio.atividadesMinisterio;

        const escalaMinisterio = {
          ministerio: ministerio.nome,
          atividades: []
        };

        for (const atividadeMinisterio of atividades) {
          const atividade = atividadeMinisterio.atividade;
          const membrosDisponiveis = membros.filter((membro) => {
            const preferencias = JSON.parse(membro.preferenciasAtividades || "[]");
            return preferencias.includes(atividade.id);
          });

          let membroSelecionado = null;
          for (const membro of membrosDisponiveis) {
            const preferenciasHorarios = JSON.parse(membro.usuario.preferenciasHorarios || "[]");
            if (preferenciasHorarios.includes(horaInicio.getHours())) {
              membroSelecionado = membro.usuario;
              break;
            }
          }

          if (membroSelecionado) {
            await prisma.participacao.create({
              data: {
                evento_id: eventoId,
                usuario_id: membroSelecionado.id,
                ministerio_id: ministerio.id,
                hora_chegada: new Date(),
                hora_saida: new Date(),
                data: dataEvento,
                mes: mes
              }
            });

            escalaMinisterio.atividades.push({
              atividade: atividade.nome,
              membro: membroSelecionado.nome
            });
          }
        }

        escalaEvento.ministerios.push(escalaMinisterio);
      }

      escalaSemana.push(escalaEvento);
    }

    await prisma.$disconnect();

    return { message: 'Escala gerada e participações registradas com sucesso', escala: escalaSemana };
  } catch (error) {
    console.error("Erro ao gerar escala da semana:", error);
    await prisma.$disconnect();
    throw error;
  }
};

export { gerarEscalaSemana };
