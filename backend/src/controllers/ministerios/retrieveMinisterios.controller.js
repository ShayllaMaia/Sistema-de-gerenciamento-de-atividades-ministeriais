import { retrieveMinisterioService } from "../../services/ministerios/retrieveMinisterios.service.js";

const retrieveMinisterioController = async (req, res, next) => {
  const { id } = req.params;
  const authHeader = req.headers["authorization"];
  const ministerio = await retrieveMinisterioService(id, authHeader);

  return res.status(200).json(ministerio);

};

export { retrieveMinisterioController };