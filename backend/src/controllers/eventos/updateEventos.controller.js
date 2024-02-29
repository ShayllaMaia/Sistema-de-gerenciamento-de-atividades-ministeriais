import { updateEventosService } from "../../services/eventos/updateEventos.service.js";

const updateEventosController = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const authHeader = req.headers["authorization"];

    const updateEvento = await updateEventosService(id, data, authHeader);

    res.status(200).json(updateEvento);
}

export { updateEventosController };