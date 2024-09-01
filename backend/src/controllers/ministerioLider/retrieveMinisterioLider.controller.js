import { retrieveMinisterioLiderService } from "../../services/ministerioLider/retrieveMinisterioLider.service.js";

const retrieveMinisterioLiderController = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const ministeriosLiderados = await getMinisterioLiderService(token);
        res.json(ministeriosLiderados);
    } catch (error) {
        console.error('Erro ao obter ministérios liderados:', error.message);
        res.status(500).send(`Error: ${error.message}`);
    }
};


export { retrieveMinisterioLiderController };