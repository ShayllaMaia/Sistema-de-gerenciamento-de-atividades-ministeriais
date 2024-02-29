import { getEventosService } from "../../services/eventos/getEventos.service.js";

const getEventosController = async(req,res) => {
    const authHeader = req.headers["authorization"];
    const eventos = await getEventosService(authHeader);

    return res.status(200).json(eventos);
}

export { getEventosController}