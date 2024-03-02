import { postEscalaService } from "../../services/escalas/postEscalas.service.js";

const postEscalaController = async (req, res) => {
    const data = req.body;
    const novaEscala = await postEscalaService(data);

    return res.status(201).json(novaEscala);
};

export { postEscalaController };
