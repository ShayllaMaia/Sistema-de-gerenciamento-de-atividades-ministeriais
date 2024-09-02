import { postPreferenciasHorarios } from "../../services/preferenciashorarios/postPreferenciasHorarios.service.js";

const postPreferenciasHorariosController = async (req, res) => {
  const data = req.body;

  const novaPreferencia = await postPreferenciasHorarios(data);

  return res.status(201).json(novaPreferencia);
};

export { postPreferenciasHorariosController};
