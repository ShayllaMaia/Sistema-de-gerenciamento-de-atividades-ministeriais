import { deleteMinisterioService } from "../../services/ministerios/deleteMinisterios.service.js";

const deleteMinisterioController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteMinisterioService(id);

    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export { deleteMinisterioController };