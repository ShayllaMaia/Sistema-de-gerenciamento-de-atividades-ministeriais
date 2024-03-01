import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { postMinisterioLiderService } from "../../services/ministerioLider/postMinisterioLider.service.js";

const postMinisterioLiderController = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const data = req.body;
    const ministerioLider = await postMinisterioLiderService(data,authHeader);
    res.send(ministerioLider);
}
export { postMinisterioLiderController };