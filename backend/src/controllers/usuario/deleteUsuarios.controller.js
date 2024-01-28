import {deleteUsuarioService} from "../../services/usuario/deleteUsuarios.service.js";

const deleteUsuariosControler = async (req,res) => {
    const {id} = req.params;
    await deleteUsuarioService(id);

    return res.status(200).send();
};

export { deleteUsuariosControler};