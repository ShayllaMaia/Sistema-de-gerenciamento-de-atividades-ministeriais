import { retrieveAtividadeService } from "../../services/atividade/retrieveAtividade.service.js";

const retriveAtividadeController = async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];
    
    const atividade = await retrieveAtividadeService(id, authHeader);
    
    return res.status(200).json(atividade)
};

export { retriveAtividadeController };
