import { Router } from "express";
import { postPreferenciasHorariosController } from "../controllers/preferenciaHorarios/postPreferenciaHorarios.controller.js";
import { getPreferenciasHorariosController } from "../controllers/preferenciaHorarios/getPreferenciaHorarios.controller.js";
import { getPreferenciasHorariosByUserIdController } from "../controllers/preferenciaHorarios/getPreferenciasHorariosByUserId.controller.js";
import { deletePreferenciasHorariosByUserIdController } from "../controllers/preferenciaHorarios/deletarPreferenciahorario.controller.js";

export const preferenciaHorariosRoutes = Router();

preferenciaHorariosRoutes.post("/", postPreferenciasHorariosController);
preferenciaHorariosRoutes.get("/", getPreferenciasHorariosController);
preferenciaHorariosRoutes.get("/:id",getPreferenciasHorariosByUserIdController);
preferenciaHorariosRoutes.delete("/:id",deletePreferenciasHorariosByUserIdController);
