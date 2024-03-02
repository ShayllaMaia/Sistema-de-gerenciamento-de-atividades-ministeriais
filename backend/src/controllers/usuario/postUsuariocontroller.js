
import { sendEmail } from "../../../middlewares/enviaEmail.middlewares.js";
import { postUsuarioService } from "../../services/usuario/postUsuario.service.js";

const postUsuarioController = async (req, res) => {
  const data = req.body;
  const novoUsuario = await postUsuarioService(data);

  // Chame a função email passando o nome da pessoa
  email(data.nome, data.email);

  return res.status(201).json(novoUsuario);
};

export { postUsuarioController };

function email(nome, email) {
  // Defina os parâmetros para o e-mail
  const to = email;
  const subject = 'Bem-vindo à nossa comunidade';
  const html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email de Boas-Vindas</title>
    <style>
      .citação {
        margin: 0px 10px;
        max-width: 200px;
        height: 60px;
        padding: 10px;
        background-color: #fff;
        color: #000;
        border-left: 5px solid #ff7f00;
        font-style: italic;
        font-size: 10px;
        display: flex;
        justify-content: center;
      }
    </style>
  </head>
  
  <body style="background-color: black; color: orange; font-family: Arial, sans-serif;">
    <table style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <tr>
        <td style="padding: 20px 0; text-align: center;">
          <h2 style="color: orange;">Bem-vindo, ${nome}</h2>
          <p>Obrigado por se juntar à nossa comunidade. Estamos muito felizes em tê-lo conosco.</p>
        </td>
      </tr>
      <tr>
        <td style="text-align: center;">
          <a href="https://example.com/login"
            style="background-color: orange; color: black; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Fazer
            Login</a>
        </td>
      </tr>
    </table>
    <p style="padding: 20px 0; text-align: center;">Se precisar de qualquer assistência ou tiver dúvidas, não hesite em
      nos contatar.</p>
    <p>Atenciosamente,<br>Equipe do SIGAM</p>
    <p style="font-size:10px;">Este é um e-mail automático, por favor, não responda.</p>
    <div class="citação" style="float: right;">
      <p> "Mas quem quiser tornar-se grande entre vocês deverá ser servo, e quem quiser ser o primeiro deverá ser escravo
        de todos." - Marcos 10:43-44 (NVI)</p>
    </div>
    <div style="clear: both;"></div>
  </body>
  
  </html>

  
  `;

  // Chame a função sendEmail
  sendEmail(to, subject, html);
}
