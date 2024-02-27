import { sendEmail } from "../../../middlewares/checkEmail.middlewares.js";
import { postUsuarioService } from "../../services/usuario/postUsuario.service.js";

const postUsuarioController = async (req, res) => {
  const data = req.body;
   email(data.email);

  const novoUsuario = await postUsuarioService(data);

  return res.status(201).json(novoUsuario);
};
export { postUsuarioController };


// Importe a função sendEmail do arquivo checkEmail.middlewares.js

function email(email) {
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
  </head>
  <body style="background-color: black; color: orange;">
      <table style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <tr>
              <td style="text-align: center;">
                  <img src="https://example.com/logo.png" alt="Logo da Empresa" style="max-width: 100%; height: auto;">
              </td>
          </tr>
          <tr>
              <td style="padding: 20px 0; text-align: center;">
                  <h2 style="color: orange;">Bem-vindo!</h2>
                  <p>Obrigado por se juntar à nossa comunidade. Estamos muito felizes em tê-lo conosco.</p>
              </td>
          </tr>
          <tr>
              <td style="text-align: center;">
                  <a href="https://example.com" style="background-color: orange; color: black; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Comece agora</a>
              </td>
          </tr>
          <tr>
              <td style="padding: 20px 0; text-align: center; font-style: italic;">
                  <p>Salmo 23:4 - "Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam."</p>
              </td>
          </tr>
          <tr>
              <td style="text-align: center;">
                  <p style="font-size: 14px;">SIGAM - Sistema de Gerenciamento Ministerial</p>
              </td>
          </tr>
      </table>
  </body>
  </html>
  
  `;

  // Chame a função sendEmail
  sendEmail(to, subject, html)
    .then(success => {
      if (success) {
        console.log('E-mail enviado com sucesso!');
      } else {
        console.log('Falha ao enviar o e-mail.');
      }
    })
    .catch(error => {
      console.error('Erro ao enviar o e-mail:', error);
    });
}
