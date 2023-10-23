import nodemailer from "nodemailer";
import { env } from "../env";

class EmailService {
  private transporter!: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
      },
    });
  }

  async sendMail(subject: string, text: string, to: string) {
    return this.transporter.sendMail({
      from: `Cartório Blockchain <no-reply@cartorio-blockchain.com>`, // sender address
      to, // list of receivers
      subject: `[Cartório Blockchain] ${subject}`, // Subject line
      text, // plain text body
    });
  }
}

export { EmailService };
