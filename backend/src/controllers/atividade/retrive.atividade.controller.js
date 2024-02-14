import { encontrarAtividadeService } from "../../services/atividade/encontrar.atividade.service.js";

export const retriveAtividadeController = async (req, res) => {
    const { id } = req.params;
    const atividade = await encontrarAtividadeService(Number(id));
    
    return res.status(200).json(atividade)
};
