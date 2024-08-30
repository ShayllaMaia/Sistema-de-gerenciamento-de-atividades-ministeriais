import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  try {
    // 3. Criando Usuários/Membros
    const senha =  String( await bcrypt.hash('senha123', 8));
    const usuarioPedro = await prisma.usuario.create({
      data: {
        nome: "Pedro",
        endereco: "Rua A, 123",
        telefone: "123456789",
        email: "pedro@example.com",
        dataNascimento: new Date("1990-01-01"),
        senha: senha,
        tipoUsuario: "NORMAL",
      },
    });
    const emilly = await prisma.usuario.create({
      data: {
        nome: "emilly",
        endereco: "Rua A, 123",
        telefone: "123456789",
        email: "emilly@example.com",
        dataNascimento: new Date("1990-01-01"),
        senha: senha,
        tipoUsuario: "LIDER",
      },
    });
    const admin = await prisma.usuario.create({
      data: {
        nome: "admin",
        endereco: "Rua A, 123",
        telefone: "123456789",
        email: "admin@example.com",
        dataNascimento: new Date("1990-01-01"),
        senha: senha,
        tipoUsuario: "ADMIN",
      },
    });

    const usuarioMaria = await prisma.usuario.create({
      data: {
        nome: "Maria",
        endereco: "Rua B, 456",
        telefone: "987654321",
        email: "maria@example.com",
        dataNascimento: new Date("1985-05-10"),
        senha: senha,
        tipoUsuario: "NORMAL",
      },
    });

    // 1. Criando Ministérios
    const ministerioLouvor = await prisma.ministerio.create({
      data: {
        nome: "Louvor",
        descricao: "Ministério responsável pela música e adoração.",
      },
    });

    const ministerioRecepcao = await prisma.ministerio.create({
      data: {
        nome: "Recepção",
        descricao: "Ministério responsável por receber os visitantes.",
      },
    });

    // 2. Criando Atividades para cada Ministério
    const atividadeCantar = await prisma.atividade.create({
      data: {
        nome: "Cantar",
        descricao: "Atividade de cantar durante o evento.",
        ministerio_id: ministerioLouvor.id,
        quantidadeMembros: 3,
      },
    });

    const atividadeTocarViolao = await prisma.atividade.create({
      data: {
        nome: "Tocar Violão",
        descricao: "Atividade de tocar violão durante o evento.",
        ministerio_id: ministerioLouvor.id,
        quantidadeMembros: 2,
      },
    });

    const atividadeRecepcionar = await prisma.atividade.create({
      data: {
        nome: "Recepcionar Visitantes",
        descricao: "Atividade de recepcionar visitantes na entrada.",
        ministerio_id: ministerioRecepcao.id,
        quantidadeMembros: 4,
      },
    });

    
    // 4. Associando Membros aos Ministérios com Preferências de Atividades
    await prisma.membrosMinisterios.createMany({
      data: [
        {
          ministerio_id: ministerioLouvor.id,
          usuario_id: usuarioPedro.id,
          preferenciasAtividades: JSON.stringify([atividadeCantar.id, atividadeTocarViolao.id]),
          statusSolicitacao: "APROVADO",
        },
        {
          ministerio_id: ministerioLouvor.id,
          usuario_id: usuarioMaria.id,
          preferenciasAtividades: JSON.stringify([atividadeCantar.id]),
          statusSolicitacao: "APROVADO",
        },
        {
          ministerio_id: ministerioRecepcao.id,
          usuario_id: usuarioPedro.id,
          preferenciasAtividades: JSON.stringify([atividadeRecepcionar.id]),
          statusSolicitacao: "APROVADO",
        },
      ],
    });

    // 5. Criando Eventos com Ministérios
    const eventoCultoDomingo = await prisma.eventos.create({
      data: {
        nome: "Culto de Domingo",
        data: new Date(), // Evento para o dia atual
        tipoEvento: "CULTO",
        hora_inicio: new Date(Date.now() + 3600000), // 1 hora a partir de agora
        hora_fim: new Date(Date.now() + 7200000), // 2 horas a partir de agora
        descricao: "Culto regular de domingo.",
        isRecorrente: false,
      },
    });

    const eventoEnsaioLouvor = await prisma.eventos.create({
      data: {
        nome: "Ensaio do Louvor",
        data: new Date(Date.now() + 86400000), // Evento para amanhã
        tipoEvento: "EVENTO",
        hora_inicio: new Date(Date.now() + 90000000), // 25 horas a partir de agora
        hora_fim: new Date(Date.now() + 99000000), // 27 horas a partir de agora
        descricao: "Ensaio do ministério de louvor.",
        isRecorrente: false,
        
      },
    });
      prisma.eventoMinisterio.create({
        evento_id: eventoCultoDomingo.id,
        ministerio_id: ministerioLouvor.id,
      });
      
      prisma.eventoMinisterio.create({
        evento_id:eventoEnsaioLouvor.id,
        ministerio_id:ministerioLouvor.id
      
      });

    console.log("Seeder executado com sucesso!");
  } catch (error) {
    console.error("Erro ao executar seeder:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();