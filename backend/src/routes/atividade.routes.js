import { Router } from "express";
import { getAtividadeController } from "../controllers/atividade/getAtividade.controller.js";
import { postAtividadeController } from "../controllers/atividade/postAtividade.controller.js";
import { updateAtividadeController } from "../controllers/atividade/updateAtividade.controller.js";
import { deletarAtividadeController } from "../controllers/atividade/deleteAtividade.controller.js";
import { retriveAtividadeController } from "../controllers/atividade/retriveAtividade.controller.js";

export const atividadeRoutes = Router();

atividadeRoutes.get("/", getAtividadeController);
atividadeRoutes.post("/", postAtividadeController);
atividadeRoutes.put("/:id", updateAtividadeController);
atividadeRoutes.delete("/:id", deletarAtividadeController);
atividadeRoutes.get("/:id", retriveAtividadeController);
