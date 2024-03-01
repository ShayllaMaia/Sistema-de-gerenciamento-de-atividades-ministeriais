import { deleteEscalaService } from "../../services/escalas/deleteEscalas.service.js";

const deleteEscalaController = async (req, res) => {
    const { id } = req.params;
    await deleteEscalaService(id);

    return res.status(200).send();
};

export { deleteEscalaController };
