import { retrieveEventosService } from "../../services/eventos/retreveEventos.service.js";


const retriveEventosController = async (req, res) => {
    const { id } = req.params;
    const atividade = await retrieveEventosService(id);
    
    return res.status(200).json(atividade)
};

export { retriveEventosController };
