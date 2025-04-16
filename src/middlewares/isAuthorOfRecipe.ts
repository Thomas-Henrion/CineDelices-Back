import type { NextFunction, Request, Response } from "express";
import { Recipe } from "../database/association";

// Check if the user is the author of the recipe
export const isAuthorOfRecipe = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const { recipeId } = req.params;
	const user = req.user;

	if (!user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const recipe = await Recipe.findByPk(recipeId);
	if (!recipe) {
		res.status(404).json({ message: "Recipe not found" });
		return;
	}

	if (recipe.authorId !== user.id) {
		res.status(403).json({ message: "Forbidden" });
		return;
	}

	next();
};
