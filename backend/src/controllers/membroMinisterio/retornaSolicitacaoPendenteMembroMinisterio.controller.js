import { retornaSolicitacaoPendenteMembroMinisterioService } from "../../services/membroMinisterio/retornaSolicitacaoPendenteMembroMinisterio.service.js";

const retornaSolicitacaoPendenteMembroMinisterio = async (req, res) => {
    const { id } = req.params;

    const authHeader = req.headers["authorization"];
    const membrosMinisterio = await retornaSolicitacaoPendenteMembroMinisterioService(id,authHeader);

    res.status(200).json(membrosMinisterio);
};

export { retornaSolicitacaoPendenteMembroMinisterio };