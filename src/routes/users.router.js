import { Router, json, urlencoded } from "express";
import { PremiumUser, DocumentsController, getUsersController, deleteUsersController } from "../controllers/users.controller.js";
import { checkRole } from "../middlewares/roles.js";
import { uploaderDocuments } from "../config/file-upload.js";
import { checkAuthenticated } from "../middlewares/isAuth.js";

const usersRouter = Router();
usersRouter.use(json());
usersRouter.use(urlencoded({ extended: true }));

usersRouter.put("/premium/:uid", checkRole(["admin"]), PremiumUser)

usersRouter.post("/:uid/documents", checkAuthenticated, uploaderDocuments.fields([{ name: "identificacion", maxCount: 1 }, { name: "domicilio", maxCount: 1 }, { name: "estadoDeCuenta", maxCount: 1 }]), DocumentsController)

usersRouter.get("/", checkRole(["admin"]), getUsersController)

usersRouter.get("/delete", checkRole(["admin"]), deleteUsersController)

export default usersRouter