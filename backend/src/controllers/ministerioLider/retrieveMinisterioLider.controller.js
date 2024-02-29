import { retrieveMinisterioLiderService } from "../../services/ministerioLider/retrieveMinisterioLider.service.js";

const retrieveMinisterioLiderController = async (req, res) => {
    const ministerioId = req.params.id;
    const authHeader = req.headers["authorization"];
    const lideres = await retrieveMinisterioLiderService(ministerioId,authHeader);
    res.status(200).json(lideres);
};
export { retrieveMinisterioLiderController };