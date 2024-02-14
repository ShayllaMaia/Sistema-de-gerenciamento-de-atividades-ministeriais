import { AppError } from "../../errors/appError.js";
import { atualizarAtivadadeService } from "../../services/atividade/atualizar.atividade.service.js";

export const updateAtividadeController = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = validaPayload(req.body);
    const atividadeCriada = await atualizarAtivadadeService(Number(id), nome, descricao);

    return res.status(200).json(atividadeCriada);
}

// nome e descrição são obrigatórios
// TODO: criar validação mais rebuscada, sugestão: utilizar a lib yup (https://www.npmjs.com/package/yup)
const validaPayload = (body) => {
    Object.keys(body).forEach(key => {
        if (!body[key] || typeof body[key] !== "string") throw new AppError("Tipo inválido na entrada [ambos os campos são strings]", 422);
        body[key] = body[key].toLowerCase();
    })
    // parse to lower
    return body;
}