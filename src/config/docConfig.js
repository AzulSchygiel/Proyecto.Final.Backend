import { __dirname } from "../utils.js";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { options } from "./options.js";

const port = options.server.port

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación sobre api de LibreMercado",
            version: "1.0.0",
            description: "Definicion de endpoints para la Api de LibreMercado"
        },
        servers: [{ url: `http://localhost:${port}` }],
    },
    apis: [`${path.join(__dirname, "/docs/**/*.yaml")}`],
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);