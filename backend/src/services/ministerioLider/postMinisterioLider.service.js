import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";
import { sendEmail } from "../../../middlewares/enviaEmail.middlewares.js";

const prisma = new PrismaClient();

const postMinisterioLiderService = async (data, token) => {
    let { ministerio_id, lider_ids } = data; // Atribuição direta de 'lider_ids' ao invés de 'lider_idss'

    // Verifica e decodifica o token
    token = await retornaInfoToken(token);
    const tipoUsuario = await retornaTipoUsuario(token);
    
    if (!tipoUsuario) throw new AppError("Usuário não encontrado", 404);
    if (tipoUsuario.tipoUsuario !== "ADMIN") throw new AppError("Acesso não autorizado: Somente admin pode atribuir um líder a um ministério", 401);
    
    // Verifica se o ministério existe
    const ministerio = await prisma.ministerio.findUnique({
        where: { id: ministerio_id },
    });
    
    if (!ministerio) {
        throw new AppError("Ministério não encontrado!", 404);
    }

    // Verifica se lider_ids é um array (não necessário, pois já é garantido no seu exemplo)
    if (!Array.isArray(lider_ids)) {
        lider_ids = [lider_ids]; // Caso seja enviado um único ID como string
    }

    if (lider_ids.length < 1) {
        throw new AppError("Um ou mais líderes não foram encontrados!", 404);
    }
    
    // Verifica se os líderes já estão conectados ao ministério
    let lideresConectados = await prisma.ministerioLider.findMany({
        where: { ministerio_id: ministerio_id },
        select: { lider_id: true },
    });

    let lideresConectadosIds = lideresConectados.map(entry => entry.lider_ids);

    // Verifica quais líderes não estão conectados
    let lideresNaoConectadosID = lider_ids.filter(liderId => !lideresConectadosIds.includes(liderId));

    // Se não houver líderes não conectados, lança um erro
    if (lideresNaoConectadosID.length === 0) {
        throw new AppError("Todos os líderes fornecidos já estão conectados a este ministério", 405);
    }
    
    // Obtém informações dos líderes que não estão conectados
    const lideresNaoConectadosObjeto = await prisma.usuario.findMany({
        where: { id: { in: lideresNaoConectadosID } },
    });

    // Cria novas conexões na tabela ministerioLider
    await prisma.ministerioLider.createMany({
        data: lideresNaoConectadosObjeto.map(lider => ({
            ministerio_id: ministerio_id,
            lider_id: lider.id,
        })),
    });

    // Atualiza os usuários para o tipo "LIDER"
    await prisma.usuario.updateMany({
        where: { id: { in: lideresNaoConectadosID } },
        data: { tipoUsuario: "LIDER" },
    });

    // Envia e-mail para os líderes recém-adicionados
    lideresNaoConectadosObjeto.forEach(lider => {
        emailDeLiderancaAderida(lider.email, lider.nome, ministerio);
    });

    return { ministerio, lideres: lideresNaoConectadosObjeto };
};

export { postMinisterioLiderService };

function emailDeLiderancaAderida(email, nome, ministerio) {
    const to = email;
    const subject = "Liderança Atribuída";
    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Liderança Atribuída</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #000; color: #fff; margin: 0; padding: 0; }
        .container { color: #fff; background-color: #000; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        h1 { color: #ff7f00; display: flex; justify-content: center; }
        p { margin-bottom: 30px; }
        .ministerio-info { background-color: #ff7f00; color: #000; padding: 10px; border-radius: 5px; margin-top: 20px; }
        .citação { max-width: 200px; height: 60px; padding: 10px; background-color: #fff; color: #000; border-left: 5px solid #ff7f00; font-style: italic; font-size: 10px; display: flex; justify-content: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Liderança Atribuída</h1>
        <p>Olá, ${nome}!</p>
        <p>Você foi adicionado como líder ao ministério "${ministerio.nome}". Parabéns!</p>
        <p>Que sua liderança seja de excelência e contribua para o sucesso do ministério.</p>
        <div class="ministerio-info">
          <strong>Detalhes do Ministério:</strong>
          <ul>
            <li><strong>Nome:</strong> ${ministerio.nome}</li>
            <li><strong>Descrição:</strong> ${ministerio.descricao}</li>
          </ul>
        </div>
        <p>Se precisar de qualquer assistência ou tiver dúvidas, não hesite em nos contatar.</p>
        <p>Atenciosamente,<br>Equipe do SIGAM</p>
        <p style="font-size:10px;">Este é um e-mail automático, por favor, não responda.</p>
        <div class="citação" style="float: right;"> 
          <p>1 Pedro 5:2-3 - "Pastoreiem o rebanho de Deus que está aos seus cuidados. Olhem por ele, não por obrigação, mas de livre vontade, como Deus quer."</p>
        </div>
        <div style="clear: both;"></div>
      </div>
    </body>
    </html>
    `;
    return sendEmail(to, subject, html);
}
