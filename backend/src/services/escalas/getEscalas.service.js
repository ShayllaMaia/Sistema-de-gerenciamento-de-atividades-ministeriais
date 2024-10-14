import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Função principal para buscar escalas (participações) geradas
const getEscalasService = async () => {
  const escalas = await gerarParticipacao();
  return escalas;
};

export { getEscalasService };

// Função para gerar participações em atividades de eventos
async function gerarParticipacao() {
  const participacoesCriadas = [];

  const dataAtual = new Date();
  const primeiroDiaMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
  const ultimoDiaMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0);

  // Obtém os eventos que estão dentro do intervalo de datas e possuem ministérios
  const eventos = await prisma.eventos.findMany({
    where: {
      data: {
        gte: primeiroDiaMes,
        lte: ultimoDiaMes,
      },
      ministerios: {
        some: {},
      },
    },
    include: {
      ministerios: true,
    },
  });

  // Itera sobre os eventos
  for (const evento of eventos) {
    for (const ministerioEvento of evento.ministerios) {
      const atividades = await prisma.atividade.findMany({
        where: {
          ministerio_id: ministerioEvento.ministerio_id,
        },
      });

      let membrosAprovados = await prisma.membrosMinisterios.findMany({
        where: {
          ministerio_id: ministerioEvento.ministerio_id,
          statusSolicitacao: 'APROVADO',
        },
        include: {
          usuario: {
            include: {
              preferenciasHorarios: true,
            },
          },
        },
      });

      // Randomiza a ordem dos membros
      membrosAprovados = shuffleArray(membrosAprovados);

      // Itera sobre as atividades e aloca membros
      for (const atividade of atividades) {
        let participantesAlocados = 0;

        // Tenta alocar membros, obedecendo ao limite de participantes
        for (const membro of membrosAprovados) {
          if (participantesAlocados >= atividade.quantidadeMembros) {
            console.log(`Limite de ${atividade.quantidadeMembros} membros já atingido para a atividade ${atividade.nome}`);
            break; // Limita a quantidade de membros na atividade
          }

          // Verifica se o membro já está participando de qualquer atividade no mesmo evento
          const participacaoExistenteNoEvento = await prisma.participacao.findFirst({
            where: {
              usuario_id: membro.usuario_id,
              evento_id: evento.id,
            },
          });

          if (participacaoExistenteNoEvento) {
            console.log(`Membro ${membro.usuario.nome} já está participando de outra atividade no evento ${evento.nome}`);
            continue; // Pula para o próximo membro se já estiver participando do evento
          }

          // Verifica se o membro está disponível para o evento
          const estaDisponivel = membro.usuario.preferenciasHorarios.every((preferencia) => {
            const diaEvento = evento.data.toLocaleString('pt-BR', { weekday: 'long' }).toUpperCase();
            const diaDaPreferencia = preferencia.dia_semana.includes(diaEvento);

            // Verifica se há intersecção entre o horário de restrição e o horário do evento
            const inicioDisponibilidade = preferencia.hora_inicio;
            const fimDisponibilidade = preferencia.hora_fim;
            const inicioEvento = evento.hora_inicio;
            const fimEvento = evento.hora_fim;

            const horarioCoincide = (inicioDisponibilidade <= fimEvento) && (fimDisponibilidade >= inicioEvento);

            // O membro está disponível se NÃO houver coincidência entre a restrição de horário e o horário do evento
            return !(diaDaPreferencia && horarioCoincide);
          });

          if (estaDisponivel) {
            try {
              const participacao = await prisma.participacao.create({
                data: {
                  evento_id: evento.id,
                  usuario_id: membro.usuario_id,
                  ministerio_id: ministerioEvento.ministerio_id,
                  atividade_id: atividade.id,
                  hora_chegada: evento.hora_inicio,
                  hora_saida: evento.hora_fim,
                  data: evento.data,
                  mes: evento.data.toISOString().slice(0, 7),
                },
              });

              console.log("Participação criada:", participacao);
              participacoesCriadas.push(participacao);
              participantesAlocados++; // Incrementa apenas se a participação for criada
            } catch (error) {
              console.error("Erro ao criar participação:", error);
            }
          } else {
            console.log(`Membro ${membro.usuario.nome} não está disponível para o evento ${evento.nome}`);
          }
        }
      }
    }
  }

  return participacoesCriadas;
}

// Função para embaralhar array de membros
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
