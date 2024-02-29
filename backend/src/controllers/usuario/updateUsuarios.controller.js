import { updateUsuarioService } from "../../services/usuario/updateUsuarios.service.js";

const updateUsuarioController = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const authHeader = req.headers["authorization"];
  const updateUsuario = await updateUsuarioService(id, data, authHeader);

  res.status(200).json(updateUsuario);
};

export { updateUsuarioController };
