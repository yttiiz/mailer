import { nodemailer } from "@deps";
import { MailConfigType, SendParameterType } from "@utils";

export class Mailer {
  private static HOSTINGER_CONFIG: MailConfigType = {
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
  };

  public static async send(
    { to, emailContent, isForAdmin = false }: SendParameterType,
  ) {
    const { createTransport } = nodemailer;
    const {
      ADMIN_EMAIL: email,
      ADMIN_USERNAME: username,
      ADMIN_PASSWORD: password,
    } = Deno.env.toObject();

    const transporter = createTransport({
      host: Mailer.HOSTINGER_CONFIG.host,
      port: Mailer.HOSTINGER_CONFIG.port,
      secure: Mailer.HOSTINGER_CONFIG.secure,
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
