import { getMembroMinisterioService } from "../../services/membroMinisterio/getMembroMinisterio.service.js";

const getMembroMinisterioController = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const membrosMinisterio = await getMembroMinisterioService(authHeader);


    res.status(200).json(membrosMinisterio);
};

export { getMembroMinisterioController };