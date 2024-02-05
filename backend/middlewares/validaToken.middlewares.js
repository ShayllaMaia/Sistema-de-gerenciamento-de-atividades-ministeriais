import { AppError } from "../src/errors/appError.js";
import jwt from "jsonwebtoken";

function validaToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const secreto = process.env.SECRET;
  console.log(token);
  console.log(secreto);
  if (!token) {
    throw new AppError("Acesso não autorizado", 401);
  }

  try {
    jwt.verify(token, secreto);
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token inválido" });
  }
}

export { validaToken };
