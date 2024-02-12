import { postEventosService } from "../../services/eventos/postEventos.service.js";

const postEventosController = async(req,res) => {
    const data = req.body;
    const novoEvento = await postEventosService(data);
    return res.status(201).json(novoEvento);
};

export {postEventosController};