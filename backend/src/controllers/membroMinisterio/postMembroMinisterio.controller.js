import { postMembroMinisterioService } from "../../services/membroMinisterio/postMembroMiniterio.service.js";

const postMembrominiterioController = async (req, res) => {
  const data = req.body;
  const novoMembroMinisterio = await postMembroMinisterioService(data);
  res.status(201).json(novoMembroMinisterio);
};

export { postMembrominiterioController };
