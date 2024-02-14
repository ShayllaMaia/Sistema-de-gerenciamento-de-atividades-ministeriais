import { deletarAtividadeService } from "../../services/atividade/deletar.atividade.service.js";
import { encontrarAtividadeService } from "../../services/atividade/encontrar.atividade.service.js";

export const deletarAtividadeController = async (req, res) => {
    const { id } = req.params;
    await deletarAtividadeService(Number(id));
    
    return res.status(204).send();
};
