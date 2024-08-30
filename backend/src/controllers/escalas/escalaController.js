// /src/controllers/escalaController.js

import { gerarEscalaSemana } from "../../services/escalas/escalaService.js";

const postEscalaController = async (req, res) => {
  try {
    const novaEscala = await gerarEscalaSemana();
    return res.status(201).json(novaEscala);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao gerar a escala semanal." });
  }
};

export { postEscalaController };
