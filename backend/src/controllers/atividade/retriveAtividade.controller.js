import { retrieveAtividadeService } from "../../services/atividade/retrieveAtividade.service.js";

const retriveAtividadeController = async (req, res) => {
    const { id } = req.params;
    const atividade = await retrieveAtividadeService(Number(id));
    
    return res.status(200).json(atividade)
};

export { retriveAtividadeController };
