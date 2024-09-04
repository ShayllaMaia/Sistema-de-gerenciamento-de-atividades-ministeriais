import { getPreferenciasHorariosService } from "../../services/preferenciashorarios/getPreferenciasHorarios.service.js";

const getPreferenciasHorariosController = async (req,res) => {
  const authHeader = req.headers["authorization"];
  const preferencias = await getPreferenciasHorariosService(authHeader);

  return res.status(200).json(preferencias);
};

export { getPreferenciasHorariosController };
