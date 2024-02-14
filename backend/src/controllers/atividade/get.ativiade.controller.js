import { listarAtividadeService } from "../../services/atividade/listar.atividade.service.js";

export const getAtividadeController = async (_, res) => {
    const atividades = await listarAtividadeService();
    return res.status(200).json(atividades)
};
