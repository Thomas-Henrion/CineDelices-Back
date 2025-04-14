import express from "express";
import recipeController from "../controllers/recipeController";

const router = express.Router();

// router.get("/", getAllRecipes);
// router.get("/:id", getRecipeById);
router.post("/", recipeController.createRecipe);
// router.delete("/:id", deleteRecipe);

export default router;
