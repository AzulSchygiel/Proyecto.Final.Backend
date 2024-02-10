import userModel from "../dao/models/user.models.js";
import { transporter } from "../config/email.js";

export async function deleteAccountEmail(email) {
    const emailTemplate = `<div>
    <h1>Cuenta Eliminada</h1>
    <img src="https://media.tenor.com/k84XzAxOMykAAAAC/goodbye-tchau.gif">
    <p>Su cuenta ha sido eliminada por desuso</p>
    </div>`

    try {
        if (email.endsWith("@coder.com")) {
            console.log("no se puede enviar mail a admin")
        } else {
            const data = await transporter.sendMail({
                from: "AromaCaffe.ar@gmail.com",
                to: email,
                subject: "Eliminación de cuenta",
                html: emailTemplate,
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteUserFunction(id) {
    const user = await userModel.findById(id)
    try {
        if (user.rol !== "admin") {
            await userModel.findByIdAndDelete(id)
        } else {
            console.log("Se han eliminado todos los usuarios a exepción de los administradores")
        }
    } catch (error) {
        console.log(error)
    }

}

export async function purchaseEmail(ticket, email) {
    const emailTemplate = `<div>
    <h1>Compra Realizada</h1>
    <img src="https://media.tenor.com/drlZ92prkqgAAAAi/coffee-drink.gif">
    <p>Se ha realizado la compra correctamente</p>
    <p>Nro de Ticket: ${ticket.code}<p>
    <p>Fecha de compra: ${ticket.purchase_datetime}<p>
    <p>Monto: $ ${ticket.amount}<p>
    <p>Gracias por su compra!<p>
    </div>`

    try {
        if (email.endsWith("@coder.com")) {
            console.log("no se puede enviar mail a admin")
        } else {
            const data = await transporter.sendMail({
                from: "AromaCaffe.ar@gmail.com",
                to: email,
                subject: "Confirmación de compra!",
                html: emailTemplate,
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProductEmail(email) {
    const emailTemplate = `<div>
    <h1>Producto Eliminado</h1>
    <img src="https://firebasestorage.googleapis.com/v0/b/react-nicolasabraham.appspot.com/o/cafe%2Femptycoffeecup.png?alt=media&token=e6f743ab-5d70-404c-bd0e-9bda09108bda">
    <p>Se ha eliminado su producto</p>
    <p>Por favor, contactese con nosotros por cualquier consulta<p>
    </div>`

    try {
        if (email.endsWith("@coder.com")) {
            console.log("no se puede enviar mail a admin")
        } else {
            const data = await transporter.sendMail({
                from: "AromaCaffe.ar@gmail.com",
                to: email,
                subject: "Producto eliminado",
                html: emailTemplate,
            })
        }
    } catch (error) {
        console.log(error)
    }
}

