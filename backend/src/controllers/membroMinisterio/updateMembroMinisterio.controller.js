const updatemembroMinisterioController = async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];
    const data = req.body;
    const updateMembroMinisterio = await updateMembroMinisterioService(id, data, authHeader);
    return res.status(204).json(updateMembroMinisterio);
};
export { updatemembroMinisterioController };