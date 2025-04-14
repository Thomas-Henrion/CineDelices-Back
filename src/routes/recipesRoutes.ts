import express from "express";
import {
	getAllRecipes,
	getRecipeById,
	createRecipe,
	deleteRecipe,
} from "../controllers/recipesController";

const router = express.Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", createRecipe);
router.delete("/:id", deleteRecipe);

export default router;
