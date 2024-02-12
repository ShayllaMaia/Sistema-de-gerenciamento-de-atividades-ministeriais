import { getEventosService } from "../../services/eventos/getEventos.service.js";

const getEventosController = async(req,res) => {
    const eventos = await getEventosService();

    return res.status(200).json(eventos);
}

export { getEventosController};