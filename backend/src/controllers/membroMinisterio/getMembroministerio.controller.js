import { getMembroMinisterioService } from "../../services/membroMinisterio/getMembroMinisterio.service.js";

const getMembroMinisterioController = async (req, res) => {
    const membrosMinisterio = await getMembroMinisterioService();

    res.status(200).json(membrosMinisterio);
};

export { getMembroMinisterioController };