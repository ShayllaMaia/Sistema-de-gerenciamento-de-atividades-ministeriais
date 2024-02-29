import { getEventosService } from "../../services/eventos/getEventos.service.js";

const getEventosController = async(req,res) => {
    const eventos = await getEventosService();
    const authHeader = req.headers["authorization"];

    return res.status(200).json(eventos,authHeader);
}

export { getEventosController};