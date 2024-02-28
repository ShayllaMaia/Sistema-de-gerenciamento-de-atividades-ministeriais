import { postMinisterioLiderService } from "../../services/ministerioLider/postMinisterioLider.service.js";

const postMinisterioLiderController = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const data = req.body;
    const ministerioLider = await postMinisterioLiderService(data,token);
    res.send(ministerioLider);
}
export { postMinisterioLiderController };