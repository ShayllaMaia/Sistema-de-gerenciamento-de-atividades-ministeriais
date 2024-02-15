import { updateMinisterioService } from "../../services/ministerios/updateMinisterios.service.js";

const updateMinisterioController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedMinisterio = await updateMinisterioService(id, data);

    return res.status(200).json(updatedMinisterio);
  } catch (error) {
    next(error);
  }
};

export { updateMinisterioController };