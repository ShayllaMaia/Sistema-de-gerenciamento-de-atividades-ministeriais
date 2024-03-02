import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const deleteEventosService = async (id, token) => {
    token = await retornaInfoToken(token);
    const tipoUsuario = await retornaTipoUsuario(token);

    if (tipoUsuario.tipoUsuario == "NORMAL") throw new AppError("Acesso não autorizado: Somente admin e lideres podem deletar um evento", 401);

    const evento = await prisma.eventos.delete({
        where: {
            id: id,
        },
    });
    if (!evento) throw new AppError("Evento não encontrado", 404);

    return true;

}

export { deleteEventosService };