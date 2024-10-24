import { meusMinisteriosService } from "../../services/membroMinisterio/meusMinisterios.service.js";

const meusMinisteriosController = async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];

    
    try {
        const response = await meusMinisteriosService(id, authHeader);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    };
export { meusMinisteriosController };