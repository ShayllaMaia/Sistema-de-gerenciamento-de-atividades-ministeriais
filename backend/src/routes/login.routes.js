import { Router } from "express";
import { loginUsuarioController } from "../controllers/login/loginUsuario.controller.js";
import { recuperaEmailController } from "../controllers/login/recuperaEmal.controller.js";

const loginRoutes = Router();

loginRoutes.post("/", loginUsuarioController);
loginRoutes.post("/recupera", recuperaEmailController);

export { loginRoutes };
