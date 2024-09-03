import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const preferenciaMembroService = async (data, token) => {
    const { idMinisterio, idMembro } = data;

    const preferenciaMembroMinisterioAtividade = await prisma.membrosMinisterios.findMany({
        where: {
            usuario_id: idMembro,
            ministerio_id: idMinisterio
        },
        select: {
            preferenciasAtividades: true
        }
    });

    // let atividades = [];
    // for (let i = 0; i < preferenciaMembroMinisterioAtividade.length; i++) {
    //     const preferenciasAtividadesArray = JSON.parse(preferenciaMembroMinisterioAtividade[i].preferenciasAtividades);

    //     const atividades = await prisma.atividade.findMany({
    //         where: {
    //             id: {
    //                 in: preferenciasAtividadesArray
    //             }
    //         }
    //     });

    //     preferenciaMembroMinisterioAtividade[i].atividades = atividades;
    // }

    return preferenciaMembroMinisterioAtividade;
};

export { preferenciaMembroService };
