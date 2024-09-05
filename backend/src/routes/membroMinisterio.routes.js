import { Router } from "express";
import { getMembroMinisterioController } from "../controllers/membroMinisterio/getMembroministerio.controller.js";
import { postMembrominiterioController } from "../controllers/membroMinisterio/postMembroMinisterio.controller.js";
import { retrieveMembroMinisterioController } from "../controllers/membroMinisterio/retrieveMembroMinisterio.controller.js";
import { deleteMembroMinisterioController } from "../controllers/membroMinisterio/deleteMembroMinisterio.controller.js";
import { retornaSolicitacaoPendenteMembroMinisterio } from "../controllers/membroMinisterio/retornaSolicitacaoPendenteMembroMinisterio.controller.js";

const membroMinisterioRoutes = Router();


membroMinisterioRoutes.get("/",getMembroMinisterioController);
membroMinisterioRoutes.post("/",postMembrominiterioController);
membroMinisterioRoutes.get("/:id",retrieveMembroMinisterioController);
membroMinisterioRoutes.post("/deletar",deleteMembroMinisterioController);
membroMinisterioRoutes.post("/membros/:id",retornaSolicitacaoPendenteMembroMinisterio);

export { membroMinisterioRoutes };