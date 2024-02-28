import { postMinisterioLiderService } from "../../services/ministerioLider/postMinisterioLider.service.js";

const postMinisterioLiderController = async (req, res) => {
    const data = req.body;
    const ministerioLider = await postMinisterioLiderService(data);
    res.send(ministerioLider);
}
export { postMinisterioLiderController };