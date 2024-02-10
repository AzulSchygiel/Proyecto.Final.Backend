import winston from "winston";
import { __dirname } from "../utils.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const currentEnv = process.env.NODE_ENV || "development";

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        error: "magenta",
        warning: "yellow",
        info: "blue",
        http: "green",
        debug: "cyan"
    }
}

const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        })
    ]
})

const prodLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: path.join(__dirname, "/logger/logs/errors.log"),
            level: "error",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors })
            )
        })
    ]
})

export const addLogger = (req, res, next) => {
    if (currentEnv === "development") {
        req.logger = devLogger
    } else {
        req.logger = prodLogger;
    }
    next();

}

export const addLoger2 = () => {
    let currentLogger;
    if (currentEnv === "development") {
        currentLogger = devLogger
    } else {
        currentLogger = prodLogger;
    }
    return currentLogger;
}