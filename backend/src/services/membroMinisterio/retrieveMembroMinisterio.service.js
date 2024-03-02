import { PrismaClient, TipoUsuario } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";
const prisma = new PrismaClient();

const retrieveMembroMinisterioService = async (id, token) => {
  token = await retornaInfoToken(token);

  const tipoUsuario = await retornaTipoUsuario(token);

  if (tipoUsuario.tipoUsuario === "NORMAL") {
    throw new AppError(
      "Acesso não autorizado: somente administrador ou lider podem fazer essa ação",
      401
    );
  }
  const ministerioID = await prisma.membrosMinisterios.findUnique({
    where: {
      id: id,
    },
    select: {
      ministerio_id: true,
    },
  });
  if (!ministerioID) {
    throw new AppError("Membro ministério não encontrado", 404);
  }

  const liderMinisterio = await prisma.ministerioLider.findUnique({
    where: {
      ministerio_id_lider_id: {
        ministerio_id: ministerioID.ministerio_id,
        lider_id: tipoUsuario.id,
      },
    },
  });

  if (tipoUsuario.tipoUsuario === "LIDER" && !liderMinisterio) {
    throw new AppError(
      "Você só pode acessar os membros de um ministério que você é lider",
      401
    );
  }
  const ministerioMembro = await prisma.membrosMinisterios.findUnique({
    where:{
        id:id
    },
  })
  return ministerioMembro;

};

export { retrieveMembroMinisterioService };
