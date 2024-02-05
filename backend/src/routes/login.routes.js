import { Router } from "express";
import { loginUsuarioController } from "../controllers/login/loginUsuario.controller.js";

const loginRoutes = Router();

loginRoutes.post("/", loginUsuarioController);

export { loginRoutes };
