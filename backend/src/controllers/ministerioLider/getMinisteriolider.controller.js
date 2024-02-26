import { getMinisterioLiderService } from "../../services/ministerioLider/getministerioLider.service.js";


const getMinisterioLiderController =  async (req, res) => {
    const ministerioLider = await getMinisterioLiderService();
    res.send(ministerioLider);
}
export { getMinisterioLiderController };