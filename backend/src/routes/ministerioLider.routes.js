import { Router } from "express";
import { postMinisterioLiderController } from "../controllers/ministerioLider/postMinisterioLider.controller.js";
import { getMinisterioLiderController } from "../controllers/ministerioLider/getMinisteriolider.controller.js";
import { retrieveMinisterioLiderController } from "../controllers/ministerioLider/retrieveMinisterioLider.controller.js";

const ministerioLiderRoutes = Router();

ministerioLiderRoutes.post("/", postMinisterioLiderController);
ministerioLiderRoutes.get("/", getMinisterioLiderController);
ministerioLiderRoutes.get("/:id", retrieveMinisterioLiderController);
export { ministerioLiderRoutes };