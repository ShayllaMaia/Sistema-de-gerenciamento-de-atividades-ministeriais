import { getPreferenciasHorariosByUserIdService } from "../../services/preferenciashorarios/getPreferenciasHorariosByUserId.service.js";

const getPreferenciasHorariosByUserIdController = async (req, res) => {
  const { id } = req.params;

  const preferencia = await getPreferenciasHorariosByUserIdService(id);

  return res.status(200).json(preferencia);
};

export { getPreferenciasHorariosByUserIdController };
