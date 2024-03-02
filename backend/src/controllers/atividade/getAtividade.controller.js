import { getAtividadeService } from "../../services/atividade/getAtividade.service.js";

const getAtividadeController = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const atividades = await getAtividadeService(authHeader);
  return res.status(200).json(atividades);
};
export { getAtividadeController };
