import multer from "multer";
import path from "path"
import { __dirname } from "../utils.js";

const ValidFields = (body) => {
    const { name, email, password } = body;
    if (!name || !email || !password) {
        return false
    } else {
        return true
    }
};

const multerFilterProfile = (req, file, cb) => {
    const isValidData = ValidFields(req.body)
    if (!isValidData) {
        cb(null, false)
    } else {
        cb(null, true)
    }
};

const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/files/users/images"))
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.email}-perfil-${file.originalname}`)
    }
});

export const uploaderProfile = multer({ storage: profileStorage, fileFilter: multerFilterProfile });

const documentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/files/users/documents"))
    },
    filename: function (req, file, cb) {
        cb(null, `${req.session.email}-documento-${file.originalname}`)
    }
});

export const uploaderDocuments = multer({ storage: documentStorage });

const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/files/products/images"))
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.title}-imagen-${file.originalname}`) 
    }
});

export const uploaderProduct = multer({ storage: productStorage });