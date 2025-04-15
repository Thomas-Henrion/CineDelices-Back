import express from "express";
import recipeController from "../controllers/recipeController";

const recipesRouter = express.Router();

recipesRouter.get("/", recipeController.getAllRecipes);
recipesRouter.get("/:id", recipeController.getRecipeById);

export default recipesRouter;
