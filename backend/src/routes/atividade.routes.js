import { Router } from "express";
import { postAtividadeController } from "../controllers/atividade/post.atividade.controller.js";
import { getAtividadeController } from "../controllers/atividade/get.ativiade.controller.js";
import { updateAtividadeController } from "../controllers/atividade/update.atividade.controller.js";
import { retriveAtividadeController } from "../controllers/atividade/retrive.atividade.controller.js";
import { deletarAtividadeController } from "../controllers/atividade/delete.atividade.controller.js";

export const atividadeRoutes = Router();

atividadeRoutes.get("/", getAtividadeController);
atividadeRoutes.get("/:id", retriveAtividadeController);
atividadeRoutes.post("/", postAtividadeController);
atividadeRoutes.put("/:id", updateAtividadeController);
atividadeRoutes.delete("/:id", deletarAtividadeController);
