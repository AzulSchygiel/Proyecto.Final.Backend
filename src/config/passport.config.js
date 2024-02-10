import passport from "passport";
import LocalStrategy from "passport-local";
import userModel from "../dao/models/user.models.js";
import { createHash, isValid } from "../utils.js";
import GithubStrategy from "passport-github2";
import jwt from "passport-jwt";
import { CartManager } from "./persistance.js";
import { GenereteUserErrorFunction } from "../services/customErrorFunctions.js";

const cart = new CartManager;
const initializePassport = () => {
    passport.use("signupStrategy", new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                const { name, last_name, age } = req.body;
                if (!name || !last_name || !age) {
                    GenereteUserErrorFunction(req.body);
                }
                const user = await userModel.findOne({ email: username })
                if (user) {
                    return done(null, false)
                }
                let rol = "user"; 
                if (username.endsWith("@coder.com")) {
                    rol = "admin"
                }
                const NewUserData = {
                    name,
                    last_name,
                    age,
                    email: username,
                    password: createHash(password),
                    rol,
                    cart: await cart.addCart(),
                    avatar: req.file.path
                }
                const newUser = await userModel.create(NewUserData);
                return done(null, newUser)
            } catch (error) {
                return done(error)
            }
        }
    ));

    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                if (!user) {
                    return done(null, false);
                }
                if (!isValid(user, password)) return done(null, false)
                user.last_connection = new Date();
                const userUpdated = await userModel.findByIdAndUpdate(user._id, user)
                return done(null, userUpdated);
            } catch (error) {
                return done(error)
            }
        }
    ));

    passport.use("githubSignup", new GithubStrategy(
        {
            clientID: "Iv1.eab6f771ead66130",
            clientSecret: "9f7da6bf7fe86e085ae7a5a1755773ceaf00476a",
            callbackURL: "http://localhost:8080/api/session/github-callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("profile", profile);
                const userExists = await userModel.findOne({ email: profile.username });
                if (userExists) {
                    return done(null, userExists);
                } else {
                    const newUser = {
                        name: profile.displayName,
                        email: profile.username,
                        password: createHash(profile.id),
                        rol: "user",
                        cart: await cart.addCart()
                    };
                    const userCreated = await userModel.create(newUser);
                    return done(null, userCreated);
                }
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        return done(null, user);
    });
}

export { initializePassport };