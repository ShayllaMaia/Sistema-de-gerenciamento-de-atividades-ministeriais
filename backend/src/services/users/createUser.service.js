import { PrismaClient} from "@prisma/client";
import { AppError} from "../../errors/appError.js"
const prisma = new PrismaClient();
const createUserService = async (data) => {
    let {name,email} = data;

    const createUser = await prisma.user.create({
            data: {
                email: email,
                name:name
            },
    });

    return createUser
    
    
}

export { createUserService};