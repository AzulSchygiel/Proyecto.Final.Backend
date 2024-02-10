import { CustomError } from "../services/customError.service.js";
import { EError } from "../enums/EError.js";
import { generateUserErrorInfo, LoginErrorInfo, LoginAuthErrorInfo, ProductErrorInfo, CartNotFoundErrorInfo, newPasswordErrorInfo } from "../services/userErrorInfo.js";

export const LoginErrorFunction = (data) => {
    CustomError.createError({
        name: "Login error",
        cause: LoginErrorInfo(data),
        message: "Error al intentar login",
        errorCode: EError.INVALID_JSON
    })
}

export const LoginAuthError = () => {
    CustomError.createError({
        name: "Auth Error",
        cause: LoginAuthErrorInfo(),
        message: "Error de autentificación",
        errorCode: EError.AUTH_ERROR
    })
}

export const GenereteUserErrorFunction = (data) => {
    CustomError.createError({
        name: "User create error",
        cause: generateUserErrorInfo(data),
        message: "Error al crear usuario",
        errorCode: EError.INVALID_JSON
    })
}

export const ProductErrorFunction = () => {
    CustomError.createError({
        name: "Error al recuperar los products",
        cause: ProductErrorInfo(),
        message: "No se pudieron recuperar los productos",
        errorCode: EError.DATABASE_ERROR
    })
}

export const CartNotFoundErrorFunction = () => {
    CustomError.createError({
        name: "Error al obtener id del carrito",
        cause: CartNotFoundErrorInfo(),
        message: "No se pudo obtener el id del carrito",
        errorCode: EError.DATABASE_ERROR
    })
}

export const newPasswordError = () => {
    CustomError.createError({
        name: "Error al restablecer contraseña",
        cause: newPasswordErrorInfo(),
        message: "No se pudo restablecer la contraseña",
        errorCode: EError.AUTH_ERROR
    })
}
