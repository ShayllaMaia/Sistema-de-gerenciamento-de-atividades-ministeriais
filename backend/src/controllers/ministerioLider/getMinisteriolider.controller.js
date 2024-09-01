import { getMinisterioLiderService } from "../../services/ministerioLider/getministerioLider.service.js";
const getMinisterioLiderController = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ error: "Token não fornecido" });
        }

        const ministerios = await getMinisterioLiderService(authHeader);
        console.log('Dados retornados do serviço:', ministerios);
        res.status(200).json(ministerios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export { getMinisterioLiderController };
