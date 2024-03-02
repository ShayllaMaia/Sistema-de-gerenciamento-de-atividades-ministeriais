import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";

const prisma = new PrismaClient();

const updateEventosService = async (id, dados, token) => {
    const eventoId = id;
    let { nome,data, hora_inicio, hora_fim, descricao } = dados;
    token = await retornaInfoToken(token);
    const tipoUsuario = await retornaTipoUsuario(token);

    if (tipoUsuario.tipoUsuario != "ADMIN") throw new AppError("Acesso não autorizado: Somente admin podem atualizar um evento", 401);

    const evento = await prisma.eventos.findUnique({
        where: {
            id: eventoId,
        }
    });

    if (!evento) {
        throw new AppError("Evento não encontrado", 404);
    }
    if (new Date(hora_inicio) >= new Date(hora_fim)) {
        throw new Error('A hora de início deve ser anterior à hora de término.');
    }

    // Criando objetos Date para as horas de início e fim
    const horaInicioFormatada = new Date(Date.parse(`1970-01-01T${hora_inicio}Z`));
    const horaFimFormatada = new Date(Date.parse(`1970-01-01T${hora_fim}Z`));

    const updateEvento = await prisma.eventos.update({
        where: {
            id: evento.id,
        },
        data: {
            nome:nome,
            data: new Date(data), // Mantendo a data como está, pois já está no formato esperado
            hora_inicio: horaInicioFormatada,
            hora_fim: horaFimFormatada,
            descricao: descricao,
        }
    });

    return updateEvento;
}

export { updateEventosService };
