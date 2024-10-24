import { atualizarSolicitacaoMembroMinisterioService } from "../../services/membroMinisterio/updateMembroMinisterio.service.js";

const updatemembroMinisterioController = async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];
    const data = req.body;
    const updateMembroMinisterio = await atualizarSolicitacaoMembroMinisterioService(id, data, authHeader);
    return res.status(204).json(updateMembroMinisterio);
};
export { updatemembroMinisterioController };

