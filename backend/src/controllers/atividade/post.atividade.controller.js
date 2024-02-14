import { AppError } from "../../errors/appError.js";
import { criarAtivadadeService } from "../../services/atividade/criar.atividade.service.js";

export const postAtividadeController = async (req, res) => {
    const { nome, descricao } = validaPayload(req.body);
    const atividadeCriada = await criarAtivadadeService(nome, descricao);

    return res.status(201).json(atividadeCriada);
}

// nome e descrição são obrigatórios
// TODO: criar validação mais rebuscada, sugestão: utilizar a lib yup (https://www.npmjs.com/package/yup)
const validaPayload = ({ nome, descricao }) => {
    if (typeof nome !== "string" || typeof descricao !== "string") throw new AppError("Tipo inválido na entrada [ambos os campos são strings]", 422);
    // parse to lower
    [nome, descricao] = [nome.toLowerCase(), descricao.toLocaleLowerCase()]
    return { nome, descricao };
}