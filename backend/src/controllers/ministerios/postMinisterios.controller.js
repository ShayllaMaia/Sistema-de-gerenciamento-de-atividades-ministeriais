import { postMinisterioService } from "../../services/ministerios/postMinisterios.service.js";

const postMinisterioController = async (req, res) => {
    const data = req.body;
    const novoMinisterio = await postMinisterioService(data);

    return res.status(201).json(novoMinisterio);
};

export { postMinisterioController };