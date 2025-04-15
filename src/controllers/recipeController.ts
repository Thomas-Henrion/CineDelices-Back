import type { Request, Response } from "express";
import {
	Recipe,
	Media,
	RecipeComposition,
	RecipeStep,
	RecipeCategory,
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
	createRecipe: async (req: Request, res: Response) => {
		const {
			name,
			coverImg,
			description,
			authorId,
			mediaId,
			categoryId,
			composition,
			steps,
		} = req.body as {
			name: string;
			coverImg: string;
			description: string;
			authorId: number;
			mediaId: number;
			categoryId: number;
			composition: {
				ingredientId: number;
				quantity: number;
				unit: string;
			}[];
			steps: { description: string }[];
		};

		try {
			const media = await Media.findByPk(mediaId);
			if (!media) {
				res.status(404).json({ message: "Media not found" });
				return;
			}

			const category = await RecipeCategory.findByPk(categoryId);
			if (!category) {
				res.status(404).json({ message: "Recipe category not found" });
				return;
			}

			const recipe = Recipe.build({
				name,
				coverImg,
				description,
				authorId,
				mediaId,
				categoryId,
				RecipeCompositions: composition.map((item) => ({
					ingredientId: item.ingredientId,
					quantity: item.quantity,
					unit: item.unit,
				})),
				RecipeSteps: steps.map((item) => ({
					description: item.description,
				})),
			}, {
				include: [
					RecipeComposition,
					RecipeStep,
				]
			});

			await recipe.save();

			return res.status(201).json(recipe);
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Error creating recipe", error });
		}
	},
};
