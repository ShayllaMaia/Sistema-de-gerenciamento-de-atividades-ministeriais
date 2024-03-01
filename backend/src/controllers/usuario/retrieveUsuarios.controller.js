import { retrieveUsuariosService } from "../../services/usuario/retrieveUsuarios.service.js";

const retrieveUsuariosController = async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];

    const usuario = await retrieveUsuariosService(id, authHeader);

    res.status(200).json(usuario);
}

export { retrieveUsuariosController };