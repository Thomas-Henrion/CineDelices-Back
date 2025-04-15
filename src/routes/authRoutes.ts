import express from "express";
import authController from "../controllers/authController";
import {
	LoginSchema,
	RegisterSchema,
	ConfirmationSchema,
} from "../validators/authValidator";
import { createValidator, type ExpressJoiError } from "express-joi-validation";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();


router.post(
	"/login",
	createValidator({ passError: true }).body(LoginSchema),
	authController.login,
);
router.post(
	"/register",
	createValidator({ passError: true }).body(RegisterSchema),
	authController.register,
);
router.post(
	"/confirm",
	createValidator({ passError: true }).body(ConfirmationSchema),
	authController.confirmEmail,
);
router.get("/refresh", authController.refreshToken);

router.get("/private", isAuthenticated, (req, res) => {
	res.status(200).json({
		message: `You are authenticated as ${req.user.name}`,
	});
});

export default router;
