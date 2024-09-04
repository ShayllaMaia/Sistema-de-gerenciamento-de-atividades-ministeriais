import { preferenciaAtividadeService } from "../../services/membroAtividade/getPreferenciaAtividade.service.js";


const preferenciaAtividadeController = async (req, res) => {
    const { id } = req.params;

    const preferenciaMembroMinisterioAtividade = await preferenciaAtividadeService(id);

    res.status(200).json(preferenciaMembroMinisterioAtividade);

}
export { preferenciaAtividadeController };