import { postMinisterioService } from "../../services/ministerios/postMinisterios.service.js";

const postMinisterioController = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const data = req.body;
    
    const novoMinisterio = await postMinisterioService(data,token);
    
    return res.status(201).json(novoMinisterio);
};

export { postMinisterioController };