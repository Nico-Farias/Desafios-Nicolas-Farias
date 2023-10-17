import {createTransport} from "nodemailer"
import {logguer} from "./logguer.js"


const transporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


const emailRegistro = (nombre) => {


    return `<h1>Hola ${
        nombre
    }, ¡Gracias por registrarte!</h1>`


}

const emailCambiarPassword = (nombre) => {
    return `<p>Hola: ${nombre} has solicitado reestablecer tu password</p>
        <p>Sigue el siguiente enlace para generar un nuevo password:
        </p>

        <a href='http://localhost:8080/api/nuevo-password'>Reestablecer password</a>

        <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>

        `
}


export const sendEmail = async (user, service, token = null) => {
    try {

        const {email, nombre} = user;

        let msg = '';
        service === 'register' ? msg = emailRegistro(nombre) : service === 'resetPass' ? msg = emailCambiarPassword(nombre) : msg = '';

        let subj = '';
        subj = service === 'register' ? 'Bienvenido/a' : service === 'resetPass' ? 'Restablecimiento de contraseña' : '';

        const gmailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subj,
            html: msg
        };

        const response = await transporter.sendMail(gmailOptions);
        console.log(response)
        if (token !== null) {
            return token;
        }


    } catch (error) {
        logguer.error(error)
    }
}
