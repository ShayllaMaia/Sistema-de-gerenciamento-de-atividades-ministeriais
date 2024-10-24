import { removePreferenciaAtividadeService } from "../../services/membroMinisterio/removePreferenciaAtividade.service.js";

const removePreferenciaAtividadeController = async (req,res)=>{
    const data = req.body;
    const { id } = req.params;
    const authHeader = req.headers["authorization"];
    const novoMembroMinisterio = await removePreferenciaAtividadeService(id,data, authHeader);
    res.status(201).json(novoMembroMinisterio);
};

export {removePreferenciaAtividadeController};