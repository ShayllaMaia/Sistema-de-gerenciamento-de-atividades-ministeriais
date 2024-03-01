import { recuperaEmailService } from "../../services/login/recuperaEmail.service.js";

const recuperaEmailController = async (req, res) => {
    const { email } = req.body;
    const usuarioAtualizado = await recuperaEmailService(email);
    return res.status(200).json(usuarioAtualizado);
  
};
export { recuperaEmailController };