import { Router } from "express";
import { getMembroMinisterioController } from "../controllers/membroMinisterio/getMembroministerio.controller.js";
import { postMembrominiterioController } from "../controllers/membroMinisterio/postMembroMinisterio.controller.js";
import { retrieveMembroMinisterioController } from "../controllers/membroMinisterio/retrieveMembroMinisterio.controller.js";
import { deleteMembroMinisterioController } from "../controllers/membroMinisterio/deleteMembroMinisterio.controller.js";
import { retornaSolicitacaoPendenteMembroMinisterio } from "../controllers/membroMinisterio/retornaSolicitacaoPendenteMembroMinisterio.controller.js";
import { updatemembroMinisterioController } from "../controllers/membroMinisterio/updateMembroMinisterio.controller.js";
import { removePreferenciaAtividadeController } from "../controllers/membroMinisterio/removerPreferenciaAtividade.controller.js";
import { addAtividadeController } from "../controllers/membroMinisterio/addAtividadeMembro.controller.js";
import { meusMinisteriosController } from "../controllers/membroMinisterio/meusMembros.controller.js";

const membroMinisterioRoutes = Router();


membroMinisterioRoutes.get("/",getMembroMinisterioController);
membroMinisterioRoutes.post("/",postMembrominiterioController);
membroMinisterioRoutes.get("/:id",retrieveMembroMinisterioController);
membroMinisterioRoutes.post("/deletar",deleteMembroMinisterioController);
membroMinisterioRoutes.get("/membros/:id",retornaSolicitacaoPendenteMembroMinisterio);
membroMinisterioRoutes.put("/atualizar/:id",updatemembroMinisterioController);
membroMinisterioRoutes.post("/remove/:id",removePreferenciaAtividadeController);
membroMinisterioRoutes.post("/adiciona/:id",addAtividadeController);
membroMinisterioRoutes.get("/ministerios/:id",meusMinisteriosController);

export { membroMinisterioRoutes };