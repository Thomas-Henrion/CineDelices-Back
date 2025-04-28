import express from "express";
import authController from "../controllers/authController";
import {
	LoginSchema,
	RegisterSchema,
	ConfirmationSchema,
} from "../validators/authValidator";
import { createValidator, type ExpressJoiError } from "express-joi-validation";
import { isAuthenticated } from "../middlewares/authMiddleware";

const authRouter = express.Router();

authRouter.post(
	"/login",
	createValidator({ passError: true }).body(LoginSchema),
	authController.login,
);
authRouter.post(
	"/register",
	createValidator({ passError: true }).body(RegisterSchema),
	authController.register,
);
authRouter.post(
	"/confirm",
	createValidator({ passError: true }).body(ConfirmationSchema),
	authController.confirmEmail,
);
authRouter.post("/refresh", authController.refreshToken);

authRouter.get("/private", isAuthenticated, (req, res) => {
	res.status(200).json({
		message: `You are authenticated as ${req.user.username}`,
	});
});

export default authRouter;
