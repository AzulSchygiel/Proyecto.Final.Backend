import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js"
import { __dirname } from "./utils.js"
import ChatManager from "./dao/db-managers/chat.manager.js"
import authRouter from "./routes/sessions.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initializePassport } from "./config/passport.config.js";
import { options } from "./config/options.js";
import { addLogger } from "./logger/logger.js";
import usersRouter from "./routes/users.router.js"
import { swaggerSpecs } from "./config/docConfig.js";

import express from "express";
import expressHbs from "express-handlebars"
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import jwt from "jsonwebtoken";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

let messages = [];
const chatManager = new ChatManager();

app.use(express.static(__dirname + "/../public"));

app.use(cookieParser());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

const hbs = expressHbs.create({})
hbs.handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
      return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

app.use(session({
  store: MongoStore.create({
    mongoUrl: options.mongoDB.URL,
    ttl: 3600,
  }),
  secret: options.server.secretSession,
  resave: true,
  saveUninitialized: true,

}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session()); 

export const port = options.server.port;

const httpServer = app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado")

  socket.on("messages", async (data) => {
    console.log(data);
    const { username, message } = await chatManager.newMessage(data)
    messages.push(data);

    io.emit("messages", messages)
  });

  socket.on("new-user", (username) => {
    socket.emit("messages", messages);
    socket.broadcast.emit("new-user", username);
  })
});

app.use((req, res, next) => {
  req.io = io
  next();
});

app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/session", authRouter);
app.use("/api/users", usersRouter);
app.use(errorHandler);
app.use(addLogger);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

export { app }