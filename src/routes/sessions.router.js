import { Router, json, urlencoded } from "express";
import { passportStrategySignupController, SignupRedirectController, passportFailedSignupController, CurrentController, GithubSignupController, GithubFailureSignupController, GithubCallbackController, LoginController, LogoutController, ForgotController, newPasswordController } from "../controllers/sessions.controller.js";
import { uploaderProfile } from "../config/file-upload.js";

const authRouter = Router();
authRouter.use(json());
authRouter.use(urlencoded({ extended: true }));

authRouter.post("/signup", uploaderProfile.single("avatar"), passportStrategySignupController, SignupRedirectController);

authRouter.get("/failure-signup", passportFailedSignupController);

authRouter.get("/current", CurrentController);

authRouter.get("/github", GithubSignupController);

authRouter.get("/github-callback", GithubFailureSignupController, GithubCallbackController)

authRouter.post("/login", LoginController);

authRouter.post("/logout", LogoutController);

authRouter.post("/forgot", ForgotController);

authRouter.post("/newPassword", newPasswordController)

export default authRouter;
