import jwt from "jsonwebtoken";
import { AppError } from "../src/errors/appError.js";
const retornaInfoToken = async (token) => {
    if (!token) throw new AppError("Acesso não autorizado", 401);
    
    token = token && token.split(" ")[1];
    
    const secreto = process.env.SECRET;
   
    const usuario = jwt.verify(token, secreto);
    
    return usuario.usuario_id;
};
export { retornaInfoToken };