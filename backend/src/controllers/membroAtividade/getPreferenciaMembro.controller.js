import { preferenciaMembroService } from "../../services/membroAtividade/getPreferenciaMembro.service.js";

const getPreferenciaMembro = async (req, res) => {
    const { idMinisterio, idMembro } = req.body;

    const preferenciaMembroMinisterioAtividade = await preferenciaMembroService({ idMinisterio, idMembro });

    res.status(200).json(preferenciaMembroMinisterioAtividade);

}
export { getPreferenciaMembro };