const postEscalaController = async (req, res) => {
    const data = req.body;
    const novaEscala = await gerarEscalaSemana();

    return res.status(201).json(novaEscala);
};

export { postEscalaController };
