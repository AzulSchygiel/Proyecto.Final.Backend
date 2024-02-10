import { EError } from "../enums/EError.js";

export const errorHandler = (error, req, res, next) => {
    switch (error.code) {
        case EError.ROUTING_ERROR:
            res.json({ status: "error", error: error.cause })
            break;
        case EError.DATABASE_ERROR:
            res.json({ status: "error", error: error.message })
            break;
        case EError.INVALID_JSON:
            res.json({ status: "error", error: error.message })
            break;
        case EError.AUTH_ERROR:
            res.json({ status: "error", error: error.message })
            break;
        default:
            res.json({ status: "error", message: "Hubo un error, por favor contacte al soporte" })
            break;
    }
}