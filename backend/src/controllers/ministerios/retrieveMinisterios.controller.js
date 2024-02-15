import { retrieveMinisterioService } from "../../services/ministerios/retrieveMinisterios.service.js";

const retrieveMinisterioController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ministerio = await retrieveMinisterioService(id);

    return res.status(200).json(ministerio);
  } catch (error) {
    next(error);
  }
};

export { retrieveMinisterioController };