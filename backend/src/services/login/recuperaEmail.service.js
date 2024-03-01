// import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../../../middlewares/enviaEmail.middlewares.js";
import { AppError } from "../../errors/appError.js";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const recuperaEmailService = async (email) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            email: email,
        },
    });
    if (!usuario) {
        throw new AppError("Usuário não encontrado", 404);
    }

    const novaSenha = Math.random().toString(36).slice(-8);

    // Aguarde a conclusão do envio do e-mail
    await enviaEmail(email, novaSenha,usuario.nome);

    // Atualize a senha se o e-mail for enviado com sucesso
    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
    const usuarioAtualizado = await prisma.usuario.update({
        where: {
            email: email,
        },
        data: {
            senha: senhaCriptografada,
        },
    });

    return usuarioAtualizado;
};
export { recuperaEmailService };

function enviaEmail(email, novaSenha,nome) {
    const to = email;
    const subject = 'Recuperação de Senha';
    const html = `
    <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Recuperação de Senha</title>
  </head>
  <body style="background-color: black; color: orange;">
      <table style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <tr>
              <td style="padding: 20px 0; text-align: center;">
                  <h2 style="color: orange;">Recuperação de Senha</h2>
                  <p style="color: orange;">Olá, ${nome}!</p>
                  <p style="color: orange;">Sua nova senha é: <strong style="font-size:20px">${novaSenha}</strong></p>
                  <p style="color: orange;">Por favor, altere sua senha após fazer login.</p>
              </td>
          </tr>
          <tr>
              <td style="text-align: center;">
                  <a href="https://example.com/login" style="background-color: orange; color: black; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Fazer Login</a>
              </td>
          </tr>
            <tr>
                <td style="text-align: center;">
                    <p style="font-size: 10px; color: orange;font-style: italic;padding: 12px 0px;;">Este é um e-mail automático, por favor não responda.</p>
                </td>
          <tr>
              <td style="text-align: center;">
                  <p style="font-size: 14px; color: orange;">SIGAM - Sistema de Gerenciamento Ministerial</p>
              </td>
          </tr>
      </table>
  </body>
  </html>
  
  
    `;

    // Retorne a promessa diretamente da função sendEmail
    return sendEmail(to, subject, html);
}
