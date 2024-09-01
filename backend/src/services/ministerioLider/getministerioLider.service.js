import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();
const getMinisterioLiderService = async (token) => {
    try {
        const liderId = await retornaInfoToken(token);
        console.log('Lider ID:', liderId); // Verifique o ID do líder

        const ministeriosLiderados = await prisma.ministerioLider.findMany({
            where: {
                lider_id: liderId,
            },
            include: {
                ministerio: true, // Inclui as informações do ministério
            },
        });

        console.log('Consulta aos ministérios liderados:', ministeriosLiderados);

        if (ministeriosLiderados.length === 0) {
            console.log('Nenhum ministério encontrado para o líder:', liderId);
            throw new Error('Ministério não encontrado!');
        }

        return ministeriosLiderados.map(ml => ({
            ministerio_id: ml.ministerio.id,
            lider_id: ml.lider_id,
            ministerio: ml.ministerio
        }));
    } catch (error) {
        console.error('Erro no serviço:', error.message);
        throw error;
    }
};



export { getMinisterioLiderService };
