const deleteMembroMinisterioController = async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];
    await deleteMembroMinisterioService(id, authHeader);
    return res.status(204);
};
export { deleteMembroMinisterioController };