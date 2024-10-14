import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const postEventosService = async (dados, token) => {
  let { nome, data, hora_inicio, hora_fim, descricao, isRecorrente, tipoEvento, ministerios } = dados;

  token = await retornaInfoToken(token);
  const tipoUsuario = await retornaTipoUsuario(token);

  // Verificando se o tipo de usuário é o correto
  if (tipoUsuario.tipoUsuario !== "ADMIN") {
    throw new AppError("Acesso não autorizado: Somente admin podem criar eventos", 401);
  }

  // Convertendo a string de hora para um objeto Date
  const dataFormatada = new Date(data).toISOString();
  const horaInicioObj = new Date(Date.parse(`${data}T${hora_inicio}+00:00`));
  const horaFimObj = new Date(Date.parse(`${data}T${hora_fim}+00:00`));

  // Verificando se a hora de início é anterior à hora de término
  if (horaInicioObj >= horaFimObj) {
    throw new AppError("A hora de início deve ser anterior à hora de término.", 400);
  }

  // Criando o evento no banco de dados
  const novoEvento = await prisma.eventos.create({
    data: {
      nome: nome,
      data: dataFormatada,
      tipoEvento: tipoEvento,
      hora_inicio: horaInicioObj,
      hora_fim: horaFimObj,
      descricao: descricao,
      isRecorrente: isRecorrente,
    },
  });

  // Verificando se há ministérios associados e criando o relacionamento
  if (ministerios && ministerios.length > 0) {
    const eventoMinisteriosData = ministerios.map((ministerioId) => ({
      evento_id: novoEvento.id,
      ministerio_id: ministerioId,
    }));

    
    // Criando os registros na tabela de relacionamento EventoMinisterio
    if (eventoMinisteriosData.length > 0) {
  try {
    const resultado = await prisma.eventoMinisterio.createMany({
      data: eventoMinisteriosData,
      skipDuplicates: true // Opcional, caso queira evitar registros duplicados
    });

    console.log(`${resultado.count} registros inseridos com sucesso.`);
  } catch (error) {
    console.error('Erro ao inserir registros:', error);
  }
} else {
  console.log('Nenhum dado para inserir.');
}
  }

  return novoEvento;
};

export { postEventosService };
