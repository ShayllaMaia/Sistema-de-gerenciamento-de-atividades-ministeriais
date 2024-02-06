import { AppError } from "../src/errors/appError.js";
import jwt from "jsonwebtoken";

function validaToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const secreto = process.env.SECRET;
  if (!token) {
    throw new AppError("Acesso não autorizado", 401);
  }

  try {
    jwt.verify(token, secreto);
    next();
  } catch (error) {
    throw new AppError("Token invalido", 401);
  }
}

export { validaToken };
