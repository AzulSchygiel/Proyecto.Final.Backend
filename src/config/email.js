import nodemailer from "nodemailer";
import { options } from "./options.js";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: options.email.email_admin,
        pass: options.email.email_password,
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});

const sendRecoveryPass = async (userEmail, token) => {
    const link = `http://localhost:8080/forgot?token=${token}`;
    await transporter.sendMail({
        from: options.email.email_admin,
        to: userEmail,
        subject: "Restablecer contraseña",
        html: `
            <div>
                <h2>Ha solicitado un cambio de contraseña</h2>
                <p>Da click en el siguiente boton para restablecer la contraseña</p>
                <a href="${link}">
                    <button>Restablecer Contraseña</button>
                </a>
            </div>
        `
    })
}

export { sendRecoveryPass }