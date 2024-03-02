import { postMembroMinisterioService } from "../../services/membroMinisterio/postMembroMiniterio.service.js";

const postMembrominiterioController = async (req, res) => {
  const data = req.body;
  const authHeader = req.headers["authorization"];
  const novoMembroMinisterio = await postMembroMinisterioService(data, authHeader);
  res.status(201).json(novoMembroMinisterio);
};

export { postMembrominiterioController };
