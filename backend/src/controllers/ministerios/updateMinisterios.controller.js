import { updateMinisterioService } from "../../services/ministerios/updateMinisterios.service.js";

const updateMinisterioController = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const { id } = req.params;
  const data = req.body;

  const updatedMinisterio = await updateMinisterioService(id, data, authHeader);
  return res.status(200).json(updatedMinisterio);

};

export { updateMinisterioController };