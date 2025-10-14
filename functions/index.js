import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { MercadoPagoConfig, Payment } from "mercadopago";

import nodemailer from "nodemailer"

// Criar app Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configurar MercadoPago
const client = new MercadoPagoConfig({
  accessToken: "api_key", // substitua pela sua
});
const paymentClient = new Payment(client);

// Rota: processar pagamento
app.post("/process_payment", async (req, res) => {
  try {
    const body = req.body;

    const result = await paymentClient.create({
      body: {
        ...body
      },
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Rota: status do pagamento
app.get("/payment_status/:id", async (req, res) => {
  try {
    const paymentId = req.params.id;
    const result = await paymentClient.get({ id: paymentId });

    res.json({ status: result.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/send-email", async (req, res) => {
  const { qrDataUrl, linkCartao, destinatario } = req.body;

  const name = "PixelsDoAmor";
  const user = "pixelsamor@gmail.com";
  const pass = "pass_key";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass
    }
  });

  const mailOptions = {
    from: `${name} <${user}>`,
    to: destinatario,
    subject: "Parabéns! sua página foi criada.",
    text: "A plataforma agradece sua preferência! volte sempre.",
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #000;">
      <h1>Parabéns! Seu cartão digital foi criado 🎉</h1>
      <p>Seu cartão em <strong>PixelsDoAmor</strong> está pronto. Você pode acessá-lo pelo QR Code abaixo ou clicando no link direto:</p>
      <div style="margin: 20px 0;">
        <img src="cid:qrcode" alt="QR Code do Cartão Digital" style="width:200px;height:200px;"/>
      </div>
      <p>
        <a href="${linkCartao}" target="_blank" style="text-decoration: none; color: white; background-color: #ff6b81; padding: 10px 20px; border-radius: 5px;">
          Acessar meu cartão
        </a>
      </p>
      <p>Obrigado por espalhar amor com <strong>PixelsDoAmor</strong>! 💌</p>
    </div>
  `,
    attachments: [
      {
        filename: "qrcode.png",
        content: qrDataUrl.split("base64,")[1],
        encoding: "base64",
        cid: "qrcode"
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "✅ E-mail enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Erro ao enviar o e-mail", error });
  }
});

app.get("/hello", (req, res) => {
  res.send("👋 Olá! Sua função está funcionando!");
});

// Exporta o app Express como uma função HTTP
export const api = onRequest({ region: "us-central1" }, app);
