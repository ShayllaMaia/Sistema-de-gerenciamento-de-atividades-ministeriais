import { postMinisterioService } from "../../services/ministerios/postMinisterios.service.js";

const postMinisterioController = async (req, res, next) => {
  try {
    const data = req.body;
    const novoMinisterio = await postMinisterioService(data);

    return res.status(201).json(novoMinisterio);
  } catch (error) {
    next(error);
  }
};

export { postMinisterioController };