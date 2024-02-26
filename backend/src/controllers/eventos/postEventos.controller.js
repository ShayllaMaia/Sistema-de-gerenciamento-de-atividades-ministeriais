import { postEventosService } from "../../services/eventos/postEventos.service.js";

const postEventosController = async(req,res) => {
    //pega o token do header da requisição
    const authHeader = req.headers["authorization"];
    //separando o token do bearer
    const token = authHeader && authHeader.split(" ")[1];
    const data = req.body;
    const novoEvento = await postEventosService(data,token);
    return res.status(201).json(novoEvento);
};

export {postEventosController};