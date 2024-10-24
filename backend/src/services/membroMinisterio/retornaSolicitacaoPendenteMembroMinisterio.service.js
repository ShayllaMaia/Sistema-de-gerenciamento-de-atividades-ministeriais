import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const retornaSolicitacaoPendenteMembroMinisterioService = async (id, token) => {


    const membrosMinisterios = await prisma.membrosMinisterios.findMany({
        where: {
            ministerio_id: id,
            statusSolicitacao: "PENDENTE",
        },
        include: {
            usuario: true,
        },
    });

    return membrosMinisterios;
}
export { retornaSolicitacaoPendenteMembroMinisterioService };