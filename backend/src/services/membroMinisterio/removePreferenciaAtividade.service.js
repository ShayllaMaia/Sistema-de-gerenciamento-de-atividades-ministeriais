import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const removePreferenciaAtividadeService = async (id,data,token) => {
    const { usuario_id, atividade_id } = data;
    
    const membroMinisterio = await prisma.membrosMinisterios.findFirst({
        where: {
          usuario_id: usuario_id,
          ministerio_id: id,
        },
        select: {
          id: true,
          preferenciasAtividades: true, // Obter apenas o campo de preferências
        },
      });
     // return membroMinisterio;
    
    if (!membroMinisterio) {
        throw new Error("Membro não encontrado ou não possui preferências de atividades.");
      }
    
      // Remover a atividade específica do array de preferências
      const preferenciasAtividadesAtualizadas = membroMinisterio.preferenciasAtividades.filter(
        (atividade) => atividade.id !== atividade_id
      );
    
      // Atualizar o registro no banco de dados com as preferências modificadas
      await prisma.membrosMinisterios.update({
        where: {
          id: membroMinisterio.id,
        },
        data: {
          preferenciasAtividades: preferenciasAtividadesAtualizadas,
        },
      });
    
      return { message: "Atividade removida com sucesso" };
    };
    export { removePreferenciaAtividadeService };