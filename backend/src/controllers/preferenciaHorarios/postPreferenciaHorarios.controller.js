import { postPreferenciasHorarios } from "../../services/preferenciashorarios/postPreferenciasHorarios.service.js";

const postPreferenciasHorariosController = async (req, res) => {
  const data = req.body;
  const authHeader = req.headers["authorization"];
  const novaPreferencia = await postPreferenciasHorarios(data,authHeader);

  return res.status(201).json(novaPreferencia);
};

export { postPreferenciasHorariosController};
