import nodemailer from 'nodemailer';

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendActivationEmail(to, link) {
        return this.transporter.sendMail({
            to,
            from: process.env.SMTP_USER,
            subject: 'Активация аккаунта на Estate Adviser',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href=${link}>${link}</a>
                    </div>
                `
        });
    }
}

export default new MailService();
