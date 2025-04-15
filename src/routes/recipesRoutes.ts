import express from "express";
import recipeController from "../controllers/recipeController";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { createValidator } from "express-joi-validation";
import { CreateRecipeSchema } from "../validators/recipesValidator";

const recipesRouter = express.Router();

recipesRouter.get("/", recipeController.getAllRecipes);
recipesRouter.get("/:id", recipeController.getRecipeById);
recipesRouter.post("/", isAuthenticated, createValidator({ passError: true }).body(CreateRecipeSchema), recipeController.createRecipe);

export default recipesRouter;
