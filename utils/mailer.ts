import { nodemailer } from "@deps";
import { SendParameterType } from "@utils";

export class Mailer {
  public static async send(
    { to, emailContent, isForAdmin = false }: SendParameterType,
  ) {
    const { createTransport } = nodemailer;
    const {
      ADMIN_EMAIL: email,
      ADMIN_USERNAME: username,
      ADMIN_PASSWORD: password,
      EMAIL_HOST_CONFIG: host,
      EMAIL_PORT_CONFIG: port,
      EMAIL_SERVICE_CONFIG: service,
      EMAIL_SECURE_CONFIG: secure,
    } = Deno.env.toObject();

    const transporter = createTransport({
      service,
      host,
      port,
      secure,
      auth: {
        user: email,
        pass: password,
      },
    });

    const { subject, messagePlainText, messageHtml } = emailContent;
    const _ = await transporter.sendMail({
      from: `${username} <${email}>`,
      to: isForAdmin ? email : to,
      subject,
      text: messagePlainText,
      html: messageHtml,
    });
  }
}
