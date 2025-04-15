import express from "express";
import recipeController from "../controllers/recipeController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const recipesRouter = express.Router();

recipesRouter.get("/", recipeController.getAllRecipes);
recipesRouter.get("/:id", recipeController.getRecipeById);
recipesRouter.post("/", isAuthenticated, recipeController.createRecipe);

export default recipesRouter;
