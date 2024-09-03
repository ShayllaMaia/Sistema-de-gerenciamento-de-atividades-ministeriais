import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deletePreferenciasHorariosSevice = async (data) => {
    const { idMembro, idMinisterio, idPreferencia } = data;
    
  
    const membroMinisterio = await prisma.membrosMinisterios.findFirst({
        where: {
            usuario_id: idMembro,
            ministerio_id: idMinisterio
        },
        select: {
            id: true, 
            preferenciasAtividades: true
        }
    });

    if (!membroMinisterio) {
        return false; 
    }

    const novaListaPreferencias = membroMinisterio.preferenciasAtividades.filter(
        (preferencia) => preferencia.id !== idPreferencia
    );

    await prisma.membrosMinisterios.update({
        where: {
            id: membroMinisterio.id 
        },
        data: {
            preferenciasAtividades: novaListaPreferencias
        }
    });

    return true; 
};

export { deletePreferenciasHorariosSevice };
