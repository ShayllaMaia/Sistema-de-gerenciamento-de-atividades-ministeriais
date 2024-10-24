import { deletarPreferenciasHorariosByUserIdService } from "../../services/preferenciashorarios/deletarPreferenciaHorario.service.js";

const deletePreferenciasHorariosByUserIdController = async (req, res) => {
  const { id } = req.params;
  const authHeader = req.headers["authorization"];
  const preferencia = await deletarPreferenciasHorariosByUserIdService(id,authHeader);

  return res.status(200).json(preferencia);
};

export { deletePreferenciasHorariosByUserIdController };
