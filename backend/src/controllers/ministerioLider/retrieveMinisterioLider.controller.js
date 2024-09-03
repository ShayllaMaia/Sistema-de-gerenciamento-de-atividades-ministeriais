import { retrieveMinisterioLiderService } from "../../services/ministerioLider/retrieveMinisterioLider.service.js";

const retrieveMinisterioLiderController = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const { id } = req.params;
        const ministeriosLiderados = await retrieveMinisterioLiderService(id, authHeader);
        res.json(ministeriosLiderados);
    } catch (error) {
        console.error('Erro ao obter ministérios liderados:', error.message);
        res.status(500).send(`Error: ${error.message}`);
    }
};


export { retrieveMinisterioLiderController };