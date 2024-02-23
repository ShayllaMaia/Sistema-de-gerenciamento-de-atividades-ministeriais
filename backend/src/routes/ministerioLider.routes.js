import { Router } from "express";
import { postMinisterioLiderController } from "../controllers/ministerioLider/postMinisterioLider.controller.js";
import { getMinisterioLiderController } from "../controllers/ministerioLider/getMinisteriolider.controller.js";

const ministerioLiderRoutes = Router();

ministerioLiderRoutes.post("/", postMinisterioLiderController);
ministerioLiderRoutes.get("/", getMinisterioLiderController);
export { ministerioLiderRoutes };