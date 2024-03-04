import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Inserir ministérios
  const ministerio1 = await prisma.ministerio.create({
    data: {
      nome: 'Ministério de Louvor e Adoração',
      descricao: 'Conduz os louvores nos cultos e eventos da igreja.',
    },
  });

  const ministerio2 = await prisma.ministerio.create({
    data: {
      nome: 'Ministério de Evangelismo',
      descricao: 'Compartilha o Evangelho com a comunidade.',
    },
  });

  const ministerio3 = await prisma.ministerio.create({
    data: {
      nome: 'Ministério Infantil',
      descricao: 'Ensino bíblico e cuidado das crianças.',
    },
  });

  // Inserir atividades
  const atividade1 = await prisma.atividade.create({
    data: {
      nome: 'Cantor',
      descricao: 'Liderar o canto congregacional nos cultos e eventos.',
      ministerio: {
        connect: { id: ministerio1.id }
      }
    },
  });

  const atividade2 = await prisma.atividade.create({
    data: {
      nome: 'Pregador',
      descricao: 'Compartilhar mensagens bíblicas nos cultos e eventos.',
      ministerio: {
        connect: { id: ministerio2.id }
      }
    },
  });

  const atividade3 = await prisma.atividade.create({
    data: {
      nome: 'Professor(a)',
      descricao: 'Ministrar aulas bíblicas para crianças de determinada faixa etária.',
      ministerio: {
        connect: { id: ministerio2.id }
      }
    },
  });

  // Inserir usuários
  const hashedPassword1 = await bcrypt.hash('senha123', 10); // 10 é o número de rounds de hashing, pode ser ajustado conforme necessário
  const hashedPassword2 = await bcrypt.hash('senha456', 10);
  const hashedPassword3 = await bcrypt.hash('senha789', 10);
  const hashedPassword4 = await bcrypt.hash('senha123', 10);

  const usuario1 = await prisma.usuario.create({
    data: {
      nome: 'João Silva',
      endereco: 'Rua das Flores, 123',
      telefone: '(11) 98765-4321',
      email: 'joaosilva@example.com',
      dataNascimento: new Date('1990-01-01'),
      senha: hashedPassword1,
      tipoUsuario: 'NORMAL',
    },
  });

  const usuario2 = await prisma.usuario.create({
    data: {
      nome: 'Maria Oliveira',
      endereco: 'Rua da Paz, 456',
      telefone: '(11) 12345-6789',
      email: 'mariaoliveira@example.com',
      dataNascimento: new Date('1995-01-01'),
      senha: hashedPassword2,
      tipoUsuario: 'LIDER',
    },
  });

  const usuario3 = await prisma.usuario.create({
    data: {
      nome: 'Ana Souza',
      endereco: 'Avenida Central, 789',
      telefone: '(11) 91234-5678',
      email: 'anasouza@example.com',
      dataNascimento: new Date('1980-07-22'),
      senha: hashedPassword3,
      tipoUsuario: 'NORMAL',
    },
  });

  const usuario4 = await prisma.usuario.create({
    data: {
      nome: 'Maria Oliveira',
      endereco: 'Rua da Paz, 456',
      telefone: '(11) 12345-6789',
      email: 'emillyvitoria1821@gmail.com',
      dataNascimento: new Date('1995-01-01'),
      senha: hashedPassword4,
      tipoUsuario: 'ADMIN',
    },
  });

  const usuario5 = await prisma.usuario.create({
    data: {
      nome: 'Ana Clara',
      endereco: 'Rua das Rosas, 204', // Sample address
      telefone: '(11) 94723-8596', // Sample phone number
      email: 'anaclara@example.com',
      dataNascimento: new Date('1998-05-12'), // Sample birthdate
      senha: await bcrypt.hash('lider123', 10), // Hashed password
      tipoUsuario: 'LIDER',
    },
  });

  const usuario6 = await prisma.usuario.create({
    data: {
      nome: 'João Pedro',
      endereco: 'Avenida Central, 1010', // Sample address
      telefone: '(21) 98541-3029', // Sample phone number
      email: 'joaop@example.com',
      dataNascimento: new Date('1992-11-21'), // Sample birthdate
      senha: await bcrypt.hash('lider456', 10), // Hashed password
      tipoUsuario: 'LIDER',
    },
  });

  // Inserir eventos
  const evento1 = await prisma.eventos.create({
    data: {
      nome: 'Culto de Domingo',
      data: new Date('2024-03-10'),
      tipoEvento: 'CULTO',
      hora_inicio: new Date('2024-03-10T09:00:00'),
      hora_fim: new Date('2024-03-10T11:00:00'),
      descricao: 'Culto dominical de adoração e ensino da Palavra de Deus.',
      isRecorrente: true,
    },
  });

  const evento2 = await prisma.eventos.create({
    data: {
      nome: 'Ensaio do Coral',
      data: new Date('2024-03-08'),
      tipoEvento: 'CULTO', // Alterado para CULTO
      hora_inicio: new Date('2024-03-08T19:00:00'),
      hora_fim: new Date('2024-03-08T21:00:00'),
      descricao: 'Ensaio do Coral da igreja para o Culto de Domingo.',
      isRecorrente: false,
    },
  });

  const evento3 = await prisma.eventos.create({
    data: {
      nome: 'Reunião de Líderes',
      data: new Date('2024-03-05'),
      tipoEvento: 'CULTO',
      hora_inicio: new Date('2024-03-05T19:30:00'),
      hora_fim: new Date('2024-03-05T21:00:00'),
      descricao: 'Reunião mensal para líderes de ministérios.',
      isRecorrente: true,
    },
  });

  // Líder do Ministério de Louvor e Adoração
  await prisma.ministerioLider.create({
    data: {
      ministerio_id: ministerio1.id,
      lider_id: usuario2.id,
    },
  });

  // Líder do Ministério de Evangelismo
  await prisma.ministerioLider.create({
    data: {
      ministerio_id: ministerio2.id,
      lider_id: usuario5.id,
    },
  });

  // Líder do Ministério Infantil
  await prisma.ministerioLider.create({
    data: {
      ministerio_id: ministerio3.id,
      lider_id: usuario6.id,
    },
  });

  // Relacionar membros aos ministérios
  await prisma.membrosMinisterios.create({
    data: {
      usuario: {
        connect: { id: usuario1.id }
      },
      ministerio: {
        connect: { id: ministerio1.id }
      },
      preferenciasAtividades: [atividade1]
    },
    include: {
      usuario: true,
      ministerio: true,
    }
  });

  await prisma.membrosMinisterios.create({
    data: {
      usuario: {
        connect: { id: usuario2.id }
      },
      ministerio: {
        connect: { id: ministerio2.id }
      },
      preferenciasAtividades: [atividade2]
    },
    include: {
      usuario: true,
      ministerio: true,
    }
  });

  await prisma.membrosMinisterios.create({
    data: {
      usuario: {
        connect: { id: usuario3.id }
      },
      ministerio: {
        connect: { id: ministerio3.id }
      },
      preferenciasAtividades: [atividade3],
    },
    include: {
      usuario: true,
      ministerio: true,
    }
  });

  console.log('Dados inseridos com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
