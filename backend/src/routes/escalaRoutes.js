// /src/routes/escalaRoutes.js
import express from "express";
import { postEscalaController } from "../controllers/escalas/escalaController.js";

const router = express.Router();

// Rota para gerar a escala semanal
router.get("/gerar-escala", postEscalaController);

export  {router};
