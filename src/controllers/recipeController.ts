import type { Request, Response } from "express";
import {
	Recipe,
	Media,
	RecipeComposition,
	Ingredient,
	RecipeStep,
	RecipeCategory,
} from "../database/association";
import { Op } from "sequelize";
import type { FindOptions } from "sequelize";

export default {
	getRecipeById: async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		try {
			const recipe = await Recipe.findByPk(id, {
				include: [RecipeComposition, RecipeStep, Media],
			});

			if (!recipe) {
				res.status(404).json({ message: "Recipe not found" });
				return;
			}

			res.status(200).json(recipe);
		} catch (error) {
			res.status(500).json({ message: "Error fetching recipe", error });
		}
	},
	createRecipe: async (req: Request, res: Response): Promise<void> => {
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

			const recipe = Recipe.build(
				{
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
				},
				{
					include: [RecipeComposition, RecipeStep],
				},
			);

			await recipe.save();

			res.status(201).json(recipe);
		} catch (error) {
			res.status(500).json({ message: "Error creating recipe", error });
		}
	},
	getRecipes: async (req: Request, res: Response): Promise<void> => {
		const {
			name,
			ingredientsIds,
			limit = "25",
			offset = "0",
		} = req.query as {
			name: string;
			ingredientsIds: unknown;
			limit: string;
			offset: string;
		};

		// Conversion des paramètres de pagination en nombres
		const numLimit = Number.parseInt(limit, 10);
		const numOffset = Number.parseInt(offset, 10);

		// Construction de la requête de base
		let where = {};
		if (name) {
			where = {
				...where,
				name: {
					[Op.like]: `%${name}%`,
				},
			};
		}

		// Options de requête de base
		const queryOptions: FindOptions<Recipe> = {
			where,
			limit: numLimit,
			offset: numOffset,
		};

		// Si des IDs d'ingrédients sont spécifiés, ajoutez la condition d'inclusion
		if (ingredientsIds) {
			const ingredientIdsArray = (ingredientsIds as string)
				.split(",")
				.map((id) => Number.parseInt(id));

			queryOptions.include = [
				{
					model: RecipeComposition,
					where: {
						ingredientId: {
							[Op.in]: ingredientIdsArray,
						},
					},
				},
			];
		} else {
			// Si aucun ingrédient n'est spécifié, incluez quand même les compositions, mais sans filtre
			queryOptions.include = [
				{
					model: RecipeComposition,
					required: false, // Rend cette inclusion optionnelle (LEFT JOIN)
				},
			];
		}

		const recipes = await Recipe.findAll(queryOptions);
		res.status(200).json(recipes);
	},
};
