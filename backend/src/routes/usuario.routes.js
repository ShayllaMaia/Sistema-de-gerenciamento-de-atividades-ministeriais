import { Router } from "express";
import { getUsuariosControler } from "../controllers/usuario/getUsuarios.controller.js";
import { postUsuarioController } from "../controllers/usuario/postUsuariocontroller.js";
import { deleteUsuariosControler } from "../controllers/usuario/deleteUsuarios.controller.js";
import { updateUsuarioController } from "../controllers/usuario/updateUsuarios.controller.js";
import { retrieveUsuariosController } from "../controllers/usuario/retrieveUsuarios.controller.js";
const usuarioRoutes = Router();

usuarioRoutes.get("/:id", retrieveUsuariosController);
usuarioRoutes.get("/", getUsuariosControler);
usuarioRoutes.post("/", postUsuarioController);
usuarioRoutes.delete("/:id", deleteUsuariosControler);
usuarioRoutes.put("/:id",updateUsuarioController);
export { usuarioRoutes };
