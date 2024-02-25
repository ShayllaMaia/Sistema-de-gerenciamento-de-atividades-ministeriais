import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const postEventosService = async (dados) => {
    try {
        let { data, horaInicio, horaFim, descricao } = dados;

        // Convertendo a string de hora para um objeto Date
        const dataFormatada = new Date(data).toISOString();
        const horaInicioObj = new Date(`${data}T${horaInicio}`);
        const horaFimObj = new Date(`${data}T${horaFim}`);
    

        if (horaInicioObj >= horaFimObj) {
            throw new AppError('A hora de início deve ser anterior à hora de término.', 400);
        }

        const novoEvento = await prisma.eventos.create({
            data: {
                data: dataFormatada,
                tipoEvento: "CULTO", // Definindo o tipo de evento como CULTO
                hora_inicio: horaInicioObj.toISOString(),
                hora_fim: horaFimObj.toISOString(),
                descricao: descricao,
            }
        });

        return novoEvento;
    } catch (error) {
        console.error('Erro ao criar evento:', error);
        throw error;
    }
};

export { postEventosService };
