import userModel from "../dao/models/user.models.js";
import { createHash, isValid } from "../utils.js";
import passport from "passport";
import { LoginErrorFunction, LoginAuthError, newPasswordError } from "../services/customErrorFunctions.js";
import { addLoger2 } from "../logger/logger.js";
import { generateEmailToken, verifyEmailToken } from "../utils.js";
import { sendRecoveryPass } from "../config/email.js";

const logger = addLoger2()

export const passportStrategySignupController = passport.authenticate("signupStrategy", {
    failureRedirect: "/api/session/failure-signup"
});

export const SignupRedirectController = (req, res) => {
    req.session.user = req.user.name
    req.session.userid = req.user._id.toString()
    req.session.email = req.user.email
    req.session.rol = req.user.rol
    req.session.age = req.user.age
    req.session.cart = req.user.cart
    req.session.cartid = req.user.cart[0]._id.toString()
    console.log(req.session);
    res.redirect("/profile");
};

export const passportFailedSignupController = (req, res) => {
    res.send("No fue posible registrar el usuario");
}

export const CurrentController = (req, res) => {
    const userData = req.session
    if (userData.user) {
        const userInfo = [{ name: userData.user, email: createHash(userData.email), rol: userData.rol, cartId: userData.cartid }]
        return res.send(userInfo);
    } else {
        res.send("Usuario No Logueado");
    }
}

export const GithubSignupController = passport.authenticate("githubSignup");

export const GithubFailureSignupController = passport.authenticate("githubSignup", {
    failureRedirect: "/api/session/failure-signup"
})

export const GithubCallbackController = (req, res) => {
    req.session.user = req.user.name
    req.session.email = req.user.email
    req.session.rol = req.user.rol
    req.session.cart = req.user.cart
    req.session.cartid = req.user.cart[0]._id.toString()
    console.log(req.session)
    res.redirect("/profile")
}
export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            logger.error(`Falta Uusario y/o contraseña`);
            LoginErrorFunction(req.body)
        }
        const user = await userModel.findOne({ email: email })
        if (!user) {
            res.send(`Usuario inexistente, haz click  <a href="/signup">Aquí</a> para registrarte`)
        } else if (email === user.email && isValid(user, password) == true) {
            req.session.user = user.name
            req.session._id = user._id
            req.session.userid = user._id.toString()
            req.session.email = user.email
            req.session.rol = user.rol
            req.session.age = user.age
            req.session.cart = user.cart
            req.session.cartid = user.cart[0]._id.toString()
            user.last_connection = new Date();
            const userUpdated = await userModel.findByIdAndUpdate(user._id, user)
            req.session.last_connection = user.last_connection
            console.log(req.session)
            res.redirect("/products")
        } else {
            logger.error(`Usario y contraseña incorrecto`)
            LoginAuthError()
            res.send("Usuario y contraseña incorrecto")
        }
    } catch (error) {
        res.redirect("/error")
    }
};

export const LogoutController = async (req, res) => {
    const user = { ...req.user }
    user.last_connection = new Date(); 
    const userUpdated = await userModel.findByIdAndUpdate(user._id, user)
    req.session.destroy(error => {
        if (error) {
            res.send("No se pudo cerrar la sesion")
        } else {
            res.redirect("/login")
        }
    });
}

export const ForgotController = async (req, res) => {
    try {
        const token = req.query.token
        const { email, newpassword } = req.body;
        const validEmail = verifyEmailToken(token)
        if (!validEmail) {
            return res.send(`El enlace ya no es vaildo. Genere uno nuevo haciendo click <a href="/newPassword">Aquí</a>`)
        } else {
            if (!email) {
                logger.error(`Falta Usario y/o contraseña`);
                LoginErrorFunction(req.body)
            }
            const user = await userModel.findOne({ email: email })
            if (isValid(user, newpassword)) {
                return res.send("No puedes utilziar la misma contraseña")
            }
            if (user) {
                user.password = createHash(newpassword);
                const userUpdate = await userModel.findOneAndUpdate({ email: user.email }, user);
                res.send(`Contraseña actualziada. Volver a <a href="/login">Login</a>`);
            } else {
                res.send("Usuario inexistente")
            }
        }
    } catch (error) {
        res.send("No se pudo restaurar la contraeña")
    }
}

export const newPasswordController = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email: email })
        if (user) {
            const token = generateEmailToken(email, 120)
            await sendRecoveryPass(email, token);
            logger.info("email enviado")
            res.send(`Se envio el correo con los pasos a seguir para restablecer la contraseña. Puede regresar a <a href="/login">login</a>`)
        } else {
            res.send(`<div>Error, usuario inexistente, por favor <a href="/login">intente de nuevo</a></div>`)
        }
    } catch (error) {
        logger.error("No se pudo restablecer contraseña")
        newPasswordError()
    }
}