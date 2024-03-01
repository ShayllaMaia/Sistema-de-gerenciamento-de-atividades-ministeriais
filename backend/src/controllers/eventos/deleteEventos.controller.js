import { deleteEventosService } from "../../services/eventos/deleteEventos.service.js";

const deleteEventosController = async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];

    await deleteEventosService(id,authHeader);
    res.status(200);



};

export { deleteEventosController };