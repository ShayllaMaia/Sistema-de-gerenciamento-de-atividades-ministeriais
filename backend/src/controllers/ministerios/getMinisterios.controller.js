import { getMinisteriosService } from "../../services/ministerios/getMinisterios.service.js";

const getMinisteriosController = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const ministerios = await getMinisteriosService(authHeader);

  return res.status(200).json(ministerios);

};

export { getMinisteriosController };