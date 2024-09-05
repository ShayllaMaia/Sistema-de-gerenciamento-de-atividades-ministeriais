import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const preferenciaAtividadeService = async (id, token) => {

    const atividade = await prisma.atividade.findFirst({
        where: {
            id: id
        }
    });

    if (!atividade) {
        throw new Error('Atividade não encontrada');
    }

    const preferenciaMembroMinisterioAtividade = await prisma.membrosMinisterios.findMany();

    const usuariosComPreferencia = preferenciaMembroMinisterioAtividade.filter(preferencia => {
        // Verificar o tipo de preferenciasAtividades
        const atividadesPreferidas = Array.isArray(preferencia.preferenciasAtividades)
            ? preferencia.preferenciasAtividades
            : []; // Default para um array vazio se não for um array

        console.log('Atividades preferidas:', atividadesPreferidas);

        return atividadesPreferidas.some(atividadePreferida => atividadePreferida.id === id) && preferencia.statusSolicitacao === 'APROVADO';
    });

    return { atividade, usuariosComPreferencia };
};

export { preferenciaAtividadeService };
