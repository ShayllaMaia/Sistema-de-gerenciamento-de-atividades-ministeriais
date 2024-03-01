import { deleteUsuarioService } from "../../services/usuario/deleteUsuarios.service.js";

const deleteUsuariosControler = async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];
    await deleteUsuarioService(id, authHeader);

    return res.status(200).send();
};

export { deleteUsuariosControler };