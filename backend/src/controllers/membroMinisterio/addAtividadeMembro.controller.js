import { addAtividadeMembroService } from "../../services/membroMinisterio/addAtividadeMembro.service.js";

const addAtividadeController = async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    try {
        const response = await addAtividadeMembroService(data, id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export { addAtividadeController };