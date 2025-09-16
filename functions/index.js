import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { MercadoPagoConfig, Payment } from "mercadopago";

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
        ...body,
        transaction_amount: 0.1, // ou o valor real
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

app.get("/hello", (req, res) => {
  res.send("👋 Olá! Sua função está funcionando!");
});

// Exporta o app Express como uma função HTTP
export const api = onRequest({ region: "us-central1" }, app);
