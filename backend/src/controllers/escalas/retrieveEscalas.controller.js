import { retrieveEscalaService } from "../../services/escalas/retrieveEscalas.service.js";

const retrieveEscalaController = async (req, res) => {
    const { id } = req.params;
    const escala = await retrieveEscalaService(id);

    return res.status(200).json(escala);
};

export { retrieveEscalaController };
