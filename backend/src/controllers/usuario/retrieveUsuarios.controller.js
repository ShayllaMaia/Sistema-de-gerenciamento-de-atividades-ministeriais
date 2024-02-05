import { retrieveUsuariosService } from "../../services/usuario/retrieveUsuarios.service.js";

const retrieveUsuariosController = async(req,res) => {
    const {id} = req.params;

    const client = await retrieveUsuariosService(id);

    res.status(200).json(client);
}

export {retrieveUsuariosController};