import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const postEscalaService = async (data) => {
    try {
        let { dataEscala, recorrente, dia_semana, evento_id } = data;

        const novaEscala = await prisma.escala.create({
            data: {
              data: dataEscala, 
              recorrente: recorrente,
              dia_semana: dia_semana,
              evento_id: evento_id || null,
            },
          });
          

        return novaEscala;
    } catch (error) {
        console.error("Erro ao criar uma nova escala:", error);
        
        throw new AppError("Erro ao criar uma nova escala. Detalhes no console.", 500);
    }
};

export { postEscalaService };
