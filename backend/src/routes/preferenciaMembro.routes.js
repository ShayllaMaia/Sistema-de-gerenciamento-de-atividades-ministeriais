import { Router } from "express";
import { getPreferenciaMembro } from "../controllers/membroAtividade/getPreferenciaMembro.controller.js";
import { deletePreferenciaMembroController } from "../controllers/membroAtividade/deleteMembroMinisterio.controller.js";
import { preferenciaAtividadeController } from "../controllers/membroAtividade/getPreferenciaAtividade.controller.js";

const preferenciaMembroRoutes = Router();

preferenciaMembroRoutes.get("/", getPreferenciaMembro);
preferenciaMembroRoutes.post("/deletar", deletePreferenciaMembroController);
preferenciaMembroRoutes.get("/:id", preferenciaAtividadeController)


export { preferenciaMembroRoutes };