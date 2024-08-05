import Mailjet from "node-mailjet";

// TODO: CAMBIAR EL SENT FROM
const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC || "your-api-key",
    apiSecret: process.env.MJ_APIKEY_PRIVATE || "your-api-secret",
  });
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "tebanbarberweb@gmail.com",
          Name: "Teban",
        },
        To: [
          {
            Email: "tebanbarberweb@gmail.com",
          },
        ],
        Subject: subject,
        TextPart: message,
        HTMLPart: message,
        CustomID: "AppGettingStartedTest",
      },
    ],
  });

  try {
    const result = await request;
    console.log("correo enviado con éxito");
    return result.body;
  } catch (err) {
    console.error("Error al enviar el correo:", err);
  }
};

export { sendEmail };
