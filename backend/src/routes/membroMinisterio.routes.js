import { Router } from "express";
import { getMembroMinisterioController } from "../controllers/membroMinisterio/getMembroministerio.controller.js";
import { postMembrominiterioController } from "../controllers/membroMinisterio/postMembroMinisterio.controller.js";
import { retrieveMembroMinisterioController } from "../controllers/membroMinisterio/retrieveMembroMinisterio.controller.js";
const membroMinisterioRoutes = Router();


membroMinisterioRoutes.get("/",getMembroMinisterioController);
membroMinisterioRoutes.post("/",postMembrominiterioController);
membroMinisterioRoutes.get("/:id",retrieveMembroMinisterioController);

export { membroMinisterioRoutes };