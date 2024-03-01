import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const postEventosService = async (dados, token) => {

  let { nome, data, hora_inicio, hora_fim, descricao, isRecorrente, tipoEvento } = dados;

  token = await retornaInfoToken(token);
  const tipoUsuario = await retornaTipoUsuario(token);

  // Verificando se o tipo de usuario é o correto
  if (tipoUsuario.tipoUsuario != "ADMIN") throw new AppError("Acesso não autorizado:Somente admim podem criar eventos", 401);

  // Convertendo a string de hora para um objeto Date
  const dataFormatada = new Date(data).toISOString();
  const horaInicioObj = new Date(Date.parse(`${data}T${hora_inicio}+00:00`));
  const horaFimObj = new Date(Date.parse(`${data}T${hora_fim}+00:00`));

  // Verificando se a hora de início é anterior à hora de término
  if (horaInicioObj >= horaFimObj) {
    throw new AppError('A hora de início deve ser anterior à hora de término.', 400);
  }

  const novoEvento = await prisma.eventos.create({
    data: {
      nome: nome,
      data: dataFormatada,
      // tipo de eventos deve ser enviado no body da requisição
      tipoEvento: tipoEvento, // Definindo o tipo de evento como CULTO
      hora_inicio: horaInicioObj,
      hora_fim: horaFimObj,
      descricao: descricao,
      isRecorrente: isRecorrente,
    }
  });

  return novoEvento;

};

export { postEventosService };