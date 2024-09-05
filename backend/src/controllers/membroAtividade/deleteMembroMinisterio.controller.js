import { deletePreferenciasHorariosSevice } from "../../services/membroAtividade/deletePreferenciaMembro.service.js";

const deletePreferenciaMembroController = async (req, res) => {
    const { idMembro, idMinisterio,idPreferencia } = req.body;

    const authHeader = req.headers["authorization"];
    await deletePreferenciasHorariosSevice({ idMembro, idMinisterio,idPreferencia }, authHeader);
    return res.status(201).json('Preferencia de atividade Removida com sucesso');

};

export { deletePreferenciaMembroController };
