import { Router } from "express";
import { getEscalasController } from "../controllers/escalas/getEscalas.controller.js";
import { postEscalaController } from "../controllers/escalas/postEscalas.controller.js";
import { deleteEscalaController } from "../controllers/escalas/deleteEscalas.controller.js";
import { updateEscalaController } from "../controllers/escalas/updateEscalas.controller.js";
import { retrieveEscalaController } from "../controllers/escalas/retrieveEscalas.controller.js";

const escalaRoutes = Router();

escalaRoutes.get("/participacao", retrieveEscalaController);
escalaRoutes.get("/", getEscalasController);
escalaRoutes.post("/", postEscalaController);
escalaRoutes.delete("/:id", deleteEscalaController);
escalaRoutes.put("/:id", updateEscalaController);

export { escalaRoutes };
