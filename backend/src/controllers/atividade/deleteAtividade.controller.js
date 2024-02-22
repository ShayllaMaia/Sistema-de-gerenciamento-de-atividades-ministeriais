import { deleteAtividadeService } from "../../services/atividade/deleteAtividade.service.js";

const deletarAtividadeController = async (req, res) => {
  const { id } = req.params;
  await deleteAtividadeService(Number(id));

  return res.status(204).send();
};
export { deletarAtividadeController };
