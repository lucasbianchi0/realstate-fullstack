import nodemailer from 'nodemailer';
import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const { TEST_MAIL, TEST_MAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: TEST_MAIL_PASSWORD
    }
});

router.post('/send-mail', (req, res) => {
  const { email, message } = req.body;

  const mailOptions = {
    from: TEST_MAIL,
    to: email, 
    subject: 'Consulta sobre propiedad',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Consulta sobre propiedad</h1>
        <p style="color: #555;">Email: ${email}</p>
        <p style="color: #555;">Mensaje:</p>
        <p style="color: #555; padding-left: 20px;">${message}</p>
        <img src="https://media.licdn.com/dms/image/C4D0BAQESkS62KfQl1A/company-logo_200_200/0/1621265758890?e=2147483647&v=beta&t=JcDmonTLAycQZDAzWm53QWu4u-1WkPD-Ibf2oY3v-Zg" alt="Logo" style="width: 100%;">
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.send('Correo enviado correctamente');
    }
  });
});


export default router