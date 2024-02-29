import { deleteMinisterioService } from "../../services/ministerios/deleteMinisterios.service.js";

const deleteMinisterioController = async (req, res, next) => {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];
    await deleteMinisterioService(id, authHeader);
    return res.status(200).send();
};

export { deleteMinisterioController };