import { Ingredient, RecipeCategory } from "../database/association";
import type { Request, Response } from "express";

export default {
	getAll: async (_req: Request, res: Response): Promise<void> => {
		try {
			const categories = await Ingredient.findAll();
			res.status(200).json(categories);
		} catch (error) {
			res.status(500).json({
				message: "Error fetching ingredients",
			});
		}
	},
};
