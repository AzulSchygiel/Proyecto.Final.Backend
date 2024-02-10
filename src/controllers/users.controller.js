import userModel from "../dao/models/user.models.js";
import { deleteAccountEmail, deleteUserFunction } from "../services/users.service.js";

export const PremiumUser = async (req, res) => {
    try {
        const userID = req.params.uid;
        const user = await userModel.findById(userID);
        const userRol = user.rol;
        if (user.documents.length < 3 && user.status !== "completo") {
            return res.json({ status: "ERROR", message: "el usuario no ha subido todos los documentos" })
        }
        if (userRol === "user") {
            user.rol = "premium"
        } else if (userRol === "premium") {
            user.rol = "user"
        } else {
            return res.json({ status: "ERROR", message: "no es posible cambiar el tipo de membresia" })
        }
        await userModel.updateOne({ _id: user._id }, user)
        res.send({ status: "succes", message: "Rol modificado" })
    } catch (error) {
        console.log(error.message)
        res.status(404).send("No se pueden obtener membresia premium")
    }
}

export const DocumentsController = async (req, res) => {
    try {
        const userId = req.params.uid 
        const user = await userModel.findById(userId)
        if (user) {
            const docs = []
            const identificacion = req.files['identificacion']?.[0] || null;
            const domicilio = req.files['domicilio']?.[0] || null;
            const estadoDeCuenta = req.files['estadoDeCuenta']?.[0] || null;
            if (identificacion) {
                docs.push({ name: "identificacion", reference: identificacion.filename })
            }
            if (domicilio) {
                docs.push({ name: "domicilio", reference: domicilio.filename })
            }
            if (estadoDeCuenta) {
                docs.push({ name: "estadoDeCuenta", reference: estadoDeCuenta.filename })
            }
            if (docs.length == 3) {
                user.status = "completo"
                user.rol = "premium"
            } else {
                user.status = "incompleto"
            }
            user.documents = docs;
            const userUpdate = await userModel.findByIdAndUpdate(user._id, user)
            res.json({ status: "success", message: "documentos actualizados" })
        } else {
            res.status(404).send("No existe el usuario")
        }
    } catch (error) {
        console.log(error.message)
        res.status(404).send("No se pueden cargar los documentos")
    }
}

export const getUsersController = async (req, res) => {
    try {
        const users = await userModel.find().lean()
        let DisplayUser = users.map(aux => {
            return `Nombre : ${aux.name}, Apellido: ${aux.last_name}, Email: ${aux.email}, Rol: ${aux.rol}`
        })
        console.log(DisplayUser)
        res.status(201).send(DisplayUser)
    } catch (error) {
        console.log(error.message)
        res.status(404).send("No se pueden obtener la lista de usuarios")
    }
}

//Eliminar usuarios sin uso 2 dias//
export const deleteUsersController = async (req, res) => {
    try {
        const users = await userModel.find().lean()
        let today = new Date()
        let timeLimit = 2 * 24 * 60 * 60 * 1000
        let control = today.getTime() - timeLimit
        let last2Days = new Date(control)

        let usersLast = users.filter(aux => (aux.last_connection < last2Days))
        let userId = usersLast.map(aux => { return { id: aux._id, email: aux.email } })
        let deleteUser = userId.forEach(aux => (deleteAccountEmail(aux.email), deleteUserFunction(aux.id)))
        console.log(userId)
        if (userId.length !== 0) {
            res.status(201).send(`Se han eliminado los usuarios inactivos`)
        } else {
            res.status(201).send(`No hay usuarios inactivos en la BD`)
        }


    } catch (error) {
        console.log(error.message)
        res.status(404).send("No se pueden eliminar los usuarios")
    }

}