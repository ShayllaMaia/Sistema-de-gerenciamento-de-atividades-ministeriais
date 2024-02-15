import { Router } from "express";
import { postEventosController } from "../controllers/eventos/postEventos.controller.js";
import { getEventosController } from "../controllers/eventos/getEventos.controller.js";
import { updateEventosController } from "../controllers/eventos/updateEventos.controller.js";
import { deleteEventosController } from "../controllers/eventos/deleteEventos.controller.js";
const eventosRoutes = Router();

eventosRoutes.post("/",postEventosController);
eventosRoutes.get("/",getEventosController);
eventosRoutes.put("/:id",updateEventosController);
eventosRoutes.delete("/:id",deleteEventosController);

export { eventosRoutes };