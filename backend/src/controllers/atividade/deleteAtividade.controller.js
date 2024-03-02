import { deleteAtividadeService } from "../../services/atividade/deleteAtividade.service.js";

const deletarAtividadeController = async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];

    await deleteAtividadeService(id, authHeader);

    return res.sendStatus(204);
};
export { deletarAtividadeController };
