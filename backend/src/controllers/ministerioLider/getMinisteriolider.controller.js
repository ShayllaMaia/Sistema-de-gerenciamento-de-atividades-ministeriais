import { getMinisterioLiderService } from "../../services/ministerioLider/getministerioLider.service.js";


const getMinisterioLiderController =  async (req, res) => {
    const authHeader = req.headers["authorization"];
    const ministerioLider = await getMinisterioLiderService(authHeader);
    res.send(ministerioLider).status(200);
}
export { getMinisterioLiderController };