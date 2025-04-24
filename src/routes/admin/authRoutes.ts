import express  from "express";
import loginController from "../../controllers/admin/loginController";

const authRouter = express.Router();

authRouter.get('/', loginController.loginForm)



export default authRouter;