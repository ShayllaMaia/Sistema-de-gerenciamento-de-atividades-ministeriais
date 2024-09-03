import { Router } from "express";
import { getPreferenciaMembro } from "../controllers/membroAtividade/getPreferenciaMembro.controller.js";
import { deletePreferenciaMembroController } from "../controllers/membroAtividade/deleteMembroMinisterio.controller.js";

const preferenciaMembroRoutes = Router();

preferenciaMembroRoutes.get("/", getPreferenciaMembro);
preferenciaMembroRoutes.post("/deletar", deletePreferenciaMembroController);


export { preferenciaMembroRoutes };