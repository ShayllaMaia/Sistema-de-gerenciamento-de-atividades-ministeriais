import { Router } from "express";
import { postMinisterioLiderController } from "../controllers/ministerioLider/postMinisterioLider.controller.js";
import { getMinisterioLiderController } from "../controllers/ministerioLider/getMinisteriolider.controller.js";
import { retrieveMinisterioLiderController } from "../controllers/ministerioLider/retrieveMinisterioLider.controller.js";
import { deleteMinisterioLiderController } from "../controllers/ministerioLider/deleteMinisterioLider.controller.js";
import { updateMinisterioLiderController } from "../controllers/ministerioLider/updateMinisterioLider.controller.js";

const ministerioLiderRoutes = Router();

ministerioLiderRoutes.post("/", postMinisterioLiderController);
ministerioLiderRoutes.get("/", getMinisterioLiderController); // Rota para obter ministérios liderados
ministerioLiderRoutes.get("/:id", retrieveMinisterioLiderController);
ministerioLiderRoutes.delete("/:id", deleteMinisterioLiderController);
ministerioLiderRoutes.put("/:id", updateMinisterioLiderController);

export { ministerioLiderRoutes };
