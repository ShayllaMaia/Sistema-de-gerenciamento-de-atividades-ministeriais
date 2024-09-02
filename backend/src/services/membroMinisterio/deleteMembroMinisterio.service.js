import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();

const deleteMembroMinisterioService = async (data, token) => {
        token = await retornaInfoToken(token);

        const { idMembro, idMinisterio } = data;

        await prisma.membrosMinisterios.deleteMany({
            where: {
                ministerio_id: idMinisterio,
                usuario_id: idMembro,
            },
        });

        console.log("Deletion successful");

        return true;
   
};

export { deleteMembroMinisterioService };
