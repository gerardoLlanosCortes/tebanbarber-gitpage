import { sendEmail } from "../utils/sendEmail.js";

//!==== POST ====
const createEmail = async (req, res) => {
  const { email, asunto, mensaje } = req.body;

  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_SENT_FROM;
    const reply_to = email;
    const subject = asunto;
    const message = mensaje;

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ succes: true, message: "Email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error ",
    });
  }
};

export { createEmail };
