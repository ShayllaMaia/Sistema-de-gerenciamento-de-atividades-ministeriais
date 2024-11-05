import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { sendEmail } from "../../../middlewares/enviaEmail.middlewares.js";

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
            break;
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
            continue;
          }

          // Verifica se o membro está disponível para o evento
          const estaDisponivel = membro.usuario.preferenciasHorarios.every((preferencia) => {
            const diaEvento = evento.data.toLocaleString('pt-BR', { weekday: 'long' }).toUpperCase();
            const diaDaPreferencia = preferencia.dia_semana.includes(diaEvento);

            const inicioDisponibilidade = preferencia.hora_inicio;
            const fimDisponibilidade = preferencia.hora_fim;
            const inicioEvento = evento.hora_inicio;
            const fimEvento = evento.hora_fim;

            const horarioCoincide = (inicioDisponibilidade <= fimEvento) && (fimDisponibilidade >= inicioEvento);

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
              enviarEmailNotificacao(membro.usuario.nome, membro.usuario.email, evento.nome, atividade.nome);
              participantesAlocados++;
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

// Função para enviar o e-mail de notificação
function enviarEmailNotificacao(nome, email, eventoNome, atividadeNome) {
  const to = email;
  const subject = `Notificação de Participação na Atividade: ${atividadeNome}`;
  const html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificação de Participação</title>
    <style>
      .citação {
        margin: 0px 10px;
        max-width: 200px;
        height: 60px;
        padding: 10px;
        background-color: #fff;
        color: #000;
        border-left: 5px solid #ff7f00;
        font-style: italic;
        font-size: 10px;
        display: flex;
        justify-content: center;
      }
    </style>
  </head>
  
  <body style="background-color: black; color: orange; font-family: Arial, sans-serif;">
    <table style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <tr>
        <td style="padding: 20px 0; text-align: center;">
          <h2 style="color: orange;">Olá, ${nome}</h2>
          <p>Você foi escalado para a atividade <strong>${atividadeNome}</strong> no evento <strong>${eventoNome}</strong>.</p>
          <p>Por favor, verifique a escala para confirmar os detalhes da sua participação.</p>
        </td>
      </tr>
      <tr>
        <td style="text-align: center;">
          <a href="https://example.com/escala"
            style="background-color: orange; color: black; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verificar Escala</a>
        </td>
      </tr>
    </table>
    <p style="padding: 20px 0; text-align: center;">Se precisar de qualquer assistência ou tiver dúvidas, não hesite em nos contatar.</p>
    <p>Atenciosamente,<br>Equipe do SIGAM</p>
    <p style="font-size:10px;">Este é um e-mail automático, por favor, não responda.</p>
    <div class="citação" style="float: right;">
      <p>"Mas quem quiser tornar-se grande entre vocês deverá ser servo, e quem quiser ser o primeiro deverá ser escravo de todos." - Marcos 10:43-44 (NVI)</p>
    </div>
    <div style="clear: both;"></div>
  </body>
  
  </html>
  `;

  // Função fictícia para enviar o e-mail
  sendEmail(to, subject, html);
}

// Função para embaralhar array de membros
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
