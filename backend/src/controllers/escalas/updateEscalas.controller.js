import { updateEscalaService } from "../../services/escalas/updateEscalas.service.js";

const updateEscalaController = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updatedEscala = await updateEscalaService(id, data);

    return res.status(200).json(updatedEscala);
};

export { updateEscalaController };
