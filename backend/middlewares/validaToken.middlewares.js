import { AppError } from "../src/errors/appError.js";
import jwt from "jsonwebtoken";


function validaToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new AppError('Acesso não autorizado', 401)
    }
    const secreto = process.env("secret");
    jwt.verify(token, secreto);

    next();
}

export { validaToken };
