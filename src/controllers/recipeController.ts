import type { Request, Response } from "express";
import Recipe from "../database/models/recipe";

export default {
	createRecipe: async (req: Request, res: Response) => {
		const { name, coverImg, description, mediaId, categoryId } =
			req.body as {
				name: string;
				coverImg: string;
				description: string;
				mediaId: number;
				categoryId: number;
			};
		const authorId = req.user.id;

		const newRecipe = await Recipe.create({
			name,
			coverImg,
			description,
			authorId,
			mediaId,
			categoryId,
		});
		res.status(201).json({
			message: "Recipe created successfully",
			recipe: newRecipe,
		});
	},
};
