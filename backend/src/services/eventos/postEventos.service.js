import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const postEventosService = async (dados, token) => {
  let { nome, data, hora_inicio, hora_fim, descricao, isRecorrente, tipoEvento, diasSemana, ministerios } = dados; // Adicionado ministerios

  token = await retornaInfoToken(token);
  const tipoUsuario = await retornaTipoUsuario(token);

  // Verificação de permissões
  if (tipoUsuario.tipoUsuario !== "ADMIN") {
    throw new AppError("Acesso não autorizado: Somente admin pode criar eventos", 401);
  }

  // Convertendo a string de data e hora para objetos Date
  const dataFormatada = new Date(data).toISOString();
  const horaInicioObj = new Date(Date.parse(`${data}T${hora_inicio}+00:00`));
  const horaFimObj = new Date(Date.parse(`${data}T${hora_fim}+00:00`));

  // Verificando se a hora de início é anterior à hora de término
  if (horaInicioObj >= horaFimObj) {
    throw new AppError('A hora de início deve ser anterior à hora de término.', 400);
  }

  // Criando o evento
  const novoEvento = await prisma.eventos.create({
    data: {
      nome,
      data: dataFormatada,
      tipoEvento, // Assumindo que tipoEvento é uma string correspondente a uma enumeração no banco de dados
      hora_inicio: horaInicioObj,
      hora_fim: horaFimObj,
      descricao,
      isRecorrente,
    }
  });

  // Verificando se 'diasSemana' foi fornecido e criando os registros correspondentes na tabela DiaSemana
  if (diasSemana && diasSemana.length > 0) {
    const diasSemanaPromises = diasSemana.map((dia) =>
      prisma.diaSemana.create({
        data: {
          evento_id: novoEvento.id,
          dia_semana: dia, // Assumindo que `dia` é um valor válido do enum `Dias`
        }
      })
    );

    await Promise.all(diasSemanaPromises);
  }

  // Verificando se 'ministerios' foi fornecido e criando os registros correspondentes na tabela EventoMinisterio
  if (ministerios && ministerios.length > 0) {
    const ministeriosPromises = ministerios.map((ministerioId) =>
      prisma.eventoMinisterio.create({
        data: {
          evento_id: novoEvento.id,
          ministerio_id: ministerioId,
        }
      })
    );

    await Promise.all(ministeriosPromises);
  }

  return novoEvento;
};

export { postEventosService };
