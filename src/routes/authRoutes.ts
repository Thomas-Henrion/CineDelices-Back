import express from "express";
import authController from "../controllers/authController";
import {
	LoginSchema,
	RegisterSchema,
	ConfirmationSchema,
} from "../validators/authValidator";
import { createValidator, type ExpressJoiError } from "express-joi-validation";

const router = express.Router();

const ContainerTypes = ["body", "query", "headers", "fields", "params"];

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

// On veux traiter les erreurs de validation Joi
router.use(
	(
		err: ExpressJoiError,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		if (err?.type && ContainerTypes.includes(err.type)) {
			res.status(400).json({
				message: err.error.message,
				type: err.type,
			});
		} else {
			next(err);
		}
	},
);

export default router;
