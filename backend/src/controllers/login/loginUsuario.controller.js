import { loginUsuarioService } from "../../services/login/loginUsuario.service.js";

const loginUsuarioController = async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await loginUsuarioService(senha, email);

  return res.json(usuario)
};

export { loginUsuarioController };
