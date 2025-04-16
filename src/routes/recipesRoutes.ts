import express from "express";
import recipeController from "../controllers/recipeController";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { createValidator } from "express-joi-validation";
import {
	CreateRecipeSchema,
	getRecipesQuerySchema,
} from "../validators/recipesValidator";
import multer from "../utils/multer";
import { isAuthorOfRecipe } from "../middlewares/isAuthorOfRecipe";

const recipesRouter = express.Router();

recipesRouter.get(
	"/",
	createValidator({ passError: true }).params(getRecipesQuerySchema),
	recipeController.getRecipes,
);
recipesRouter.get("/:id", recipeController.getRecipeById);
recipesRouter.post(
	"/",
	isAuthenticated,
	createValidator({ passError: true }).body(CreateRecipeSchema),
	recipeController.createRecipe,
);
recipesRouter.put(
	"/:recipeId/coverImg",
	isAuthenticated,
	isAuthorOfRecipe,
	multer.single("coverImg"),
	recipeController.updateRecipeCoverImg,
);

export default recipesRouter;
