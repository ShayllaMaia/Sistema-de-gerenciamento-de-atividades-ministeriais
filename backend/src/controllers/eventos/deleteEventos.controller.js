import { deleteEventosService } from "../../services/eventos/deleteEventos.service.js";

const deleteEventosController = async (req,res) => {
    try{
        const {id} = req.params;
        await deleteEventosService(id);
        res.status(200).send();
    } catch(error){
        res.status(400).send(error);
    }
    


};

export {deleteEventosController};