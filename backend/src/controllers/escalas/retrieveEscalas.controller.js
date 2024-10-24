import { getParticipacoes } from "../../services/escalas/retrieveEscalas.service.js";

const retrieveEscalaController = async (req, res) => {
    const escala = await getParticipacoes();

    return res.status(200).json(escala);
};

export { retrieveEscalaController };
