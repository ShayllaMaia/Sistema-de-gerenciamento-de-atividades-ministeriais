import { retrieveMinisterioLiderService } from "../../services/ministerioLider/retrieveMinisterioLider.service.js";

const retrieveMinisterioLiderController = async (req, res) => {
    const ministerioId = req.params.id;
    const lideres = await retrieveMinisterioLiderService(ministerioId);
    res.status(200).json(lideres);
};
export { retrieveMinisterioLiderController };