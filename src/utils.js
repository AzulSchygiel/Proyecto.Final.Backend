import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { options } from "./config/options.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Secret_key = "tokenSecretKey"

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

const isValid = (user, loginPassword) => {
    return bcrypt.compareSync(loginPassword, user.password);
}

const generateToken = (user) => {
    const token = jwt.sign(user, Secret_key, {
        expiresIn: "360s"
    });
    return (token);
}

const validateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).send("Acceso no autorizado");
    const token = authHeader.split(" ")[1]; 
    jwt.verify(token, Secret_key, (err, info) => {
        if (err) return res.status(401).send("Acceso no autorizado");
        req.user = info;
        next();
    });
}

const generateEmailToken = (email, expireTime) => {
    const token = jwt.sign({ email }, options.email.token_email, { expiresIn: expireTime })
    return token;
}

const verifyEmailToken = (token) => {
    try {
        const info = jwt.verify(token, options.email.token_email)
        return info.email
    } catch (error) {
        console.log(error.message)
        return null;
    }
}

export { __dirname, createHash, isValid, generateToken, validateToken, generateEmailToken, verifyEmailToken };