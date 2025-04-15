import { RecipeCategory } from "../database/association";
import type { Request, Response } from "express";

export default {
	getAllCategories: async (_req: Request, res: Response): Promise<void> => {
		try {
			const categories = await RecipeCategory.findAll();
			res.status(200).json(categories);
		} catch (error) {
			res.status(500).json({
				message: "Error fetching categories",
			});
		}
	},
};
