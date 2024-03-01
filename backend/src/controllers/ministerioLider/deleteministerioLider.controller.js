const deleteMinisterioLiderController = async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers["authorization"];
    await deleteMinisterioLiderService(id, authHeader);
    return res.status(204);
}
export { deleteMinisterioLiderController };