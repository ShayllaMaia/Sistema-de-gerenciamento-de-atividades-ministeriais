import { AppError } from "../../errors/appError.js";
import { postAtivadadeService } from "../../services/atividade/postAtividade.service.js";


const postAtividadeController = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    const data = req.body;
    const atividadeCriada = await postAtivadadeService(data,token);

    return res.status(201).json(atividadeCriada);
};


// const validaPayload = ({ nome, descricao,ministerio_id }) => {
//     if (typeof nome !== "string" || typeof descricao !== "string") throw new AppError("Tipo inválido na entrada [ambos os campos são strings]", 422);
//     // parse to lower
//     [nome, descricao,ministerio_id] = [nome.toLowerCase(), descricao.toLocaleLowerCase(),]
//     return { nome, descricao,ministerio_id };
// };

export { postAtividadeController };