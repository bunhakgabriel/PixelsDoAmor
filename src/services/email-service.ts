import type { IEmail } from "../models/IEmail";

export const sendEmail = async (emailData: IEmail): Promise<string> => {
    try {
      const response = await fetch("https://us-central1-moments-bf0c4.cloudfunctions.net/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(emailData)
      });

      const result = await response.json();
      return result // ✅ E-mail enviado com sucesso!
    } catch (error) {
      return "Erro ao enviar e-mail: " + error;
    }
}