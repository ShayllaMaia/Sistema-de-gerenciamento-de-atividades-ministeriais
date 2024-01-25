import { Router } from "express";
import { getUsuariosControler } from "../controllers/usuario/getUsuarios.controller.js";
import { postUsuarioController } from "../controllers/usuario/postUsuariocontroller.js";


const usuarioRoutes = Router();

usuarioRoutes.get("/", getUsuariosControler);
usuarioRoutes.post("/", postUsuarioController);

export { usuarioRoutes };