// Importe o módulo nodemailer como um padrão (default import)
import nodemailer from "nodemailer";

// Crie um objeto de transporte (transporter)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sistemadegerenciamentodeativid@gmail.com",
      pass: "sssa crvu ohlo nepi"
    }
});

// Defina a função sendEmail
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: 'SIGAM - Sistema de gerênciamento de atividades ministeriais',
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado com sucesso: " + info.response);
    return true;
  } catch (error) {
    console.error("Erro ao enviar e-mail: " + error);
    return false;
  }
};


export { sendEmail };
