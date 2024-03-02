import { retrieveMembroMinisterioService } from "../../services/membroMinisterio/retrieveMembroMinisterio.service.js";

const retrieveMembroMinisterioController = async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];
    const membroMinisterio = await retrieveMembroMinisterioService(id, authHeader);
    res.status(200).json(membroMinisterio);
};
export { retrieveMembroMinisterioController };