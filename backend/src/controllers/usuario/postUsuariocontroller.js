import { postUsuarioService } from "../../services/usuario/postUsuario.service.js";

const postUsuarioController = async (req, res) => {
  const data = req.body;
  const novoUsuario = await postUsuarioService(data);

  return res.status(201).json(novoUsuario);
};
export { postUsuarioController };
