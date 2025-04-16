import express from "express";
import mediaController from "../controllers/mediaController";
import { getMediasQuerySchema } from "../validators/mediaValidator";
import { createValidator } from "express-joi-validation";

const mediaRouter = express.Router();

mediaRouter.get(
	"/",
	createValidator({ passError: true }).params(getMediasQuerySchema),
	mediaController.getAllMedias,
);
mediaRouter.get("/:id", mediaController.getMediaById);
mediaRouter.get("/:id/recipes", mediaController.getMediaRecipes);

export default mediaRouter;
