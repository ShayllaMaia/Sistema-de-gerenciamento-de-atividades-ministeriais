import { updateMinisterioLiderService } from "../../services/ministerioLider/updateMinisterioLider.service.js";
const updateMinisterioLiderController = async (req,res) => {
    const {id} = req.params;
    const data = req.body;
    const authHeader = req.headers["authorization"];
    
    const updateMinisterioLider = await updateMinisterioLiderService(id,data,authHeader);

    res.status(200).json(updateMinisterioLider);
}

export {updateMinisterioLiderController};