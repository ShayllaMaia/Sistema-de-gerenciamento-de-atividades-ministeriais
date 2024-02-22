import { getAtividadeService } from "../../services/atividade/getAtividade.service.js";

const getAtividadeController = async (_, res) => {
  const atividades = await getAtividadeService();
  return res.status(200).json(atividades);
};
export { getAtividadeController };
