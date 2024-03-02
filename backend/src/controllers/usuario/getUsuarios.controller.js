import { getUsuariosService } from "../../services/usuario/getUsuarios.service.js";

const getUsuariosControler = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const usuarios = await getUsuariosService(authHeader);

  return res.status(200).json(usuarios);
};

export { getUsuariosControler };
