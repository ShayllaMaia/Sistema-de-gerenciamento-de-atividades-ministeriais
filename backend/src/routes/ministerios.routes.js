import { Router } from "express";
import { retrieveMinisterioController } from "../controllers/ministerios/retrieveMinisterios.controller.js";
import { getMinisteriosController } from "../controllers/ministerios/getMinisterios.controller.js";
import { postMinisterioController } from "../controllers/ministerios/postMinisterios.controller.js";
import { updateMinisterioController } from "../controllers/ministerios/updateMinisterios.controller.js";
import { deleteMinisterioController } from "../controllers/ministerios/deleteMinisterios.controller.js";


const ministerioRoutes = Router();

ministerioRoutes.get("/:id", retrieveMinisterioController);
ministerioRoutes.get("/", getMinisteriosController);
ministerioRoutes.post("/", postMinisterioController);
ministerioRoutes.delete("/:id", deleteMinisterioController);
ministerioRoutes.put("/:id", updateMinisterioController);

export { ministerioRoutes };