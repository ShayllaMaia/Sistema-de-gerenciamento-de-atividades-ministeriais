import { getMinisteriosService } from "../../services/ministerios/getMinisterios.service.js";

const getMinisteriosController = async (req, res, next) => {
  try {
    const ministerios = await getMinisteriosService();

    return res.status(200).json(ministerios);
  } catch (error) {
    next(error);
  }
};

export { getMinisteriosController };