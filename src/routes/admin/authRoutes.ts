//  régler le router
import { Router } from "express";
import * as authController from "../../controllers/admin/authController";

const authRouter = Router();

authRouter.get("/register", authController.displaySignUpForm);
authRouter.post("/register", authController.handleSignUp);
authRouter.get("/login", authController.displayLoginForm);
authRouter.post("/login", authController.handleLogin);
authRouter.get("/logout", authController.logout);

export default authRouter;
