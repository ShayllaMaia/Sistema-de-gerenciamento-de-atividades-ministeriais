import { getUsuariosService } from "../../services/usuario/getUsuarios.service.js";

const getUsuariosControler = async (req, res) => {
  const usuarios = await getUsuariosService();

  return res.status(200).json(usuarios);
};

export { getUsuariosControler };
