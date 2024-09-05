import { AppError } from "../../errors/appError.js";
import { updateAtivadadeService } from "../../services/atividade/updateAtividade.service.js";

const updateAtividadeController = async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];
    
    const { nome, descricao,quantidadeMembros
     } = req.body;
    const atividadeCriada = await updateAtivadadeService(id, nome, descricao,quantidadeMembros,authHeader);

    return res.status(200).json(atividadeCriada);
};

const validaPayload = (body) => {
    Object.keys(body).forEach(key => {
        if (!body[key] || typeof body[key] !== "string") throw new AppError("Tipo inválido na entrada [ambos os campos são strings]", 422);
        body[key] = body[key].toLowerCase();
    })
    // parse to lower
    return body;
};

export { updateAtividadeController };