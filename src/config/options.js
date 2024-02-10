import dotenv from "dotenv";
dotenv.config();

export const options = {
    fileSystem: {
        usersFileName: 'users.json',
        productsFileName: 'products.json',
        cartFileName: 'cart.json'
    },
    mongoDB: {
        ENVIRONMENT: process.env.ENVIRONMENT,
        URL: process.env.MONGO_URL,
        TEST: process.env.MONGO_URL_TEST,
    },
    server: {
        port: process.env.PORT,
        secretSession: process.env.SECRET_SESSION,
        persistance: process.env.PERSISTANCE,
    },
    email: {
        token_email: process.env.TOKEN_MAIL,
        email_admin: process.env.EMAIL_ADMIN,
        email_password: process.env.EMAIL_PASSWORD
    }
};