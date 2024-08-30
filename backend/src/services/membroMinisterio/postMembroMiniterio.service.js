import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const postMembroMinisterioService = async (data, token) => {
  let { usuario_id, ministerio_id, preferenciasAtividades } = data;

  token = await retornaInfoToken(token);
  const tipoUsuario = await retornaTipoUsuario(token);

  if (tipoUsuario.tipoUsuario === "NORMAL") {
    throw new AppError("Acesso não autorizado: Somente admin e líderes podem adicionar um membro a um ministério", 401);
  }

  const usuario = await prisma.usuario.findUnique({
    where: { id: usuario_id },
  });

  const ministerio = await prisma.ministerio.findUnique({
    where: { id: ministerio_id },
  });

  if (!usuario || !ministerio) {
    throw new AppError("Usuário ou ministério não encontrado!", 404);
  }

  if (!preferenciasAtividades || preferenciasAtividades.length === 0) {
    throw new AppError("Deve ter atividades preferenciais", 401);
  }

  // Conectar as atividades preferenciais ao membro do ministério
  const novoMembroMinisterio = await prisma.membrosMinisterios.create({
    data: {
      usuario: {
        connect: { id: usuario_id }
      },
      ministerio: {
        connect: { id: ministerio_id }
      },
      preferenciasAtividades: {
        connect: preferenciasAtividades.map((atividadeId) => ({
          id: atividadeId
        })),
      },
    },
    include: {
      usuario: true,
      ministerio: true,
      preferenciasAtividades: true, // Certifique-se de incluir as atividades preferenciais no retorno, se necessário
    }
  });

  return novoMembroMinisterio;
};

export { postMembroMinisterioService };
