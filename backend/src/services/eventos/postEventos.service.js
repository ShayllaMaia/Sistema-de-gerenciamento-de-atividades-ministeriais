import { Prisma, PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

const postEventosService = async (data) => {
    
        let{date,hora_inicio,hora_fim,descricao} = data;
        console.log(data)
        if (new Date(hora_inicio) >= new Date(hora_fim)) {
            throw new Error('A hora de início deve ser anterior à hora de término.');
          }
      
          // Certifique-se de que as datas estão no formato correto
          const dataFormatada = new Date(date);
          const horaInicioFormatada = new Date(hora_inicio);
          const horaFimFormatada = new Date(hora_fim);
        const novoEvento = await prisma.eventos.create({
            data:{
                data: dataFormatada,
                hora_inicio: horaInicioFormatada,
                hora_fim: horaFimFormatada,
                descricao: descricao,
            }
            
        });

        return novoEvento;
    
}

export {postEventosService};