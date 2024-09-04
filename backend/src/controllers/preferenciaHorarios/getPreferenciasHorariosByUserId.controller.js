import { getPreferenciasHorariosByUserIdService } from "../../services/preferenciashorarios/getPreferenciasHorariosByUserId.service.js";

const getPreferenciasHorariosByUserIdController = async (req, res) => {
  const { id } = req.params;
  const authHeader = req.headers["authorization"];
  const preferencia = await getPreferenciasHorariosByUserIdService(id,authHeader);

  return res.status(200).json(preferencia);
};

export { getPreferenciasHorariosByUserIdController };
