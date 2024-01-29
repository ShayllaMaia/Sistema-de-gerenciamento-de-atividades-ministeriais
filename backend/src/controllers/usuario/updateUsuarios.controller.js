import { updateUsuarioService } from "../../services/usuario/updateUsuarios.service.js";


const updateUsuarioController = async(req,res) =>{
    
        const {id} = req.params;
        const data = req.body;
        const updateUsuario = await updateUsuarioService(id,data);
        res.status(200).send(user);
    
        res.status(400).send(e);
    

    
};

export {updateUsuarioController};