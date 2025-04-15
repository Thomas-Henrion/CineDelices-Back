import type { Request, Response } from "express";
import {
	Recipe,
	Media,
	RecipeComposition,
	RecipeStep,
} from "../database/association";

export default {
	getAllRecipes: async (req: Request, res: Response) => {
		try {
			const recipes = await Recipe.findAll();
			return res.status(200).json(recipes);
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Error fetching recipes", error });
		}
	},
	getRecipeById: async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			const recipe = await Recipe.findByPk(id, {
				include: [RecipeComposition, RecipeStep, Media],
			});

			if (!recipe) {
				return res.status(404).json({ message: "Recipe not found" });
			}

			return res.status(200).json(recipe);
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Error fetching recipe", error });
		}
	},
};
