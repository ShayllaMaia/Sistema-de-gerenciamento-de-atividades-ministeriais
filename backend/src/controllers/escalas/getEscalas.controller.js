import { getEscalasService } from "../../services/escalas/getEscalas.service.js";

const getEscalasController = async (req, res) => {
    const escalas = await getEscalasService();

    return res.status(200).json(escalas);
};

export { getEscalasController };
