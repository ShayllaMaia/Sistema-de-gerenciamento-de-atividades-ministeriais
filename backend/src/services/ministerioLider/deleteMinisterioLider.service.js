import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const deleteMinisterioLiderService = async (id, token) => {
  token = await retornaInfoToken(token);
  const tipoUsuario = await retornaTipoUsuario(token);

  if (tipoUsuario.tipoUsuario !== "ADMIN")
    throw new AppError(
      "Acesso não autorizado: Somente admin pode deleter os lideres de um ministério",
      401
    );
  const lideres_id = await prisma.ministerioLider.findMany({
    where: {
      ministerio_id: id,
    },
    select: {
      lider_id: true,
    },
  });

  if (lideres_id.length === 0) {
    throw new AppError("Ministério Lider não encontrado", 404);
  } else {
    const lideres_idArray = lideres_id.map((entry) => entry.lider_id);

    await prisma.usuario.updateMany({
      where: {
        id: {
          in: lideres_idArray,
        },
      },
      data: {
        tipoUsuario: "NORMAL",
      },
    });

    await prisma.ministerioLider.deleteMany({
      where: {
        ministerio_id: id,
        lider_id: {
          in: lideres_idArray,
        },
      },
    });
  }
};

export { deleteMinisterioLiderService };
