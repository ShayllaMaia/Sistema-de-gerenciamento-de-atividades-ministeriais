import { deleteMembroMinisterioService } from "../../services/membroMinisterio/deleteMembroMinisterio.service.js";

const deleteMembroMinisterioController = async (req, res) => {
    const data = req.body;
    const authHeader = req.headers["authorization"];
    await deleteMembroMinisterioService(data, authHeader);
    return res.status(201).json('Membro Removido com sucesso');
};
export { deleteMembroMinisterioController };