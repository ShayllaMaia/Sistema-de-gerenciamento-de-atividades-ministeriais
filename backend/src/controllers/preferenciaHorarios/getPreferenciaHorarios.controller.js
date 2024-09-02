import { getPreferenciasHorariosService } from "../../services/preferenciashorarios/getPreferenciasHorarios.service.js";

const getPreferenciasHorariosController = async (req,res) => {
  const preferencias = await getPreferenciasHorariosService();

  return res.status(200).json(preferencias);
};

export { getPreferenciasHorariosController };
