import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addAtividadeMembroService = async (data, ministerio_id) => {
  const { atividade_id, usuario_id } = data;

  console.log("Iniciando processo para adicionar atividade...");
  console.log("Dados recebidos:", data);

  // Buscar o membro no ministério
  let membroMinisterio = await prisma.membrosMinisterios.findFirst({
    where: {
      usuario_id: usuario_id,
      ministerio_id: ministerio_id,
    },
  });

  if (!membroMinisterio) {
    throw new Error("Membro não encontrado no ministério!");
  }

  // Buscar a atividade que será adicionada
  let atividade = await prisma.atividade.findFirst({
    where: {
      id: atividade_id,
    },
  });

  if (!atividade) {
    throw new Error("Atividade não encontrada!");
  }

  // Como preferenciasAtividades já é um array, não precisamos usar JSON.parse
  let preferenciasAtividades = membroMinisterio.preferenciasAtividades || [];

  console.log("Preferências Atuais:", preferenciasAtividades);

  // Verificar se a atividade já está nas preferências
  const atividadeJaAdicionada = preferenciasAtividades.some(
    (atividadePreferida) => atividadePreferida.id === atividade.id
  );

  if (atividadeJaAdicionada) {
    throw new Error("A atividade já está nas preferências do membro.");
  }

  // Adicionar a nova atividade ao array de preferências
  preferenciasAtividades.push({
    id: atividade.id,
    nome: atividade.nome,
    descricao: atividade.descricao,
    ministerio_id: atividade.ministerio_id,
    quantidadeMembros: atividade.quantidadeMembros,
  });

  // Atualizar o campo preferenciasAtividades com o novo array
  await prisma.membrosMinisterios.update({
    where: {
      id: membroMinisterio.id,
    },
    data: {
      preferenciasAtividades: preferenciasAtividades, // Como é um campo JSON, o Prisma irá salvar corretamente
    },
  });

  console.log("Atividade adicionada com sucesso.");
  return { message: "Atividade adicionada com sucesso às preferências do membro!" };
};

export { addAtividadeMembroService };
