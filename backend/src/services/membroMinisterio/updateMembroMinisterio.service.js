import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const atualizarSolicitacaoMembroMinisterioService = async (id,data, token) => {
  const { usuario_id, statusSolicitacao } = data;
  const ministerio_id = id;

  token = await retornaInfoToken(token);
  const tipoUsuario = await retornaTipoUsuario(token);

  const usuario = await prisma.usuario.findUnique({
    where: {
      id: usuario_id,
    },
  });

  const ministerio = await prisma.ministerio.findUnique({
    where: {
      id: ministerio_id,
    },
  });

  if (!usuario || !ministerio) {
    throw new AppError("Usuário ou ministério não encontrado!", 404);
  }

  // Atualizando o status de solicitação do membro no ministério
  const membroMinisterio = await prisma.membrosMinisterios.updateMany({
    where: {
      usuario_id: usuario_id,
      ministerio_id: ministerio_id,
    },
    data: {
      statusSolicitacao: statusSolicitacao,
    },
  });

  if (membroMinisterio.count === 0) {
    throw new AppError("Não foi possível atualizar o status de solicitação. Membro ou ministério inválido.", 404);
  }

  return {
    message: "Status de solicitação atualizado com sucesso.",
    membroMinisterio,
  };
};

export { atualizarSolicitacaoMembroMinisterioService };
