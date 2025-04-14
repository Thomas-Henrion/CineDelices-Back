import { RecipeCategory } from "../../database/association";
import type { Request, Response } from "express";

export default {
	createCategory: async (req: Request, res: Response): Promise<void> => {
		let { name } = req.body as {
			name: string;
		};

		name = name.charAt(0).toUpperCase() + name.slice(1);

		try {
			const existingCategory = await RecipeCategory.findOne({
				where: { name },
			});
			if (existingCategory) {
				res.status(409).json({
					message: "Category already exists",
				});
				return;
			}
			const newCategory = await RecipeCategory.create({
				name,
			});
			res.status(201).json({
				message: "Category created successfully",
				category: newCategory,
			});
		} catch (error) {
			res.status(500).json({
				message: "Error creating category",
			});
		}
	},
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
	deleteCategory: async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		try {
			const category = await RecipeCategory.findByPk(Number(id));
			if (!category) {
				res.status(404).json({
					message: "Category not found",
				});
				return;
			}
			await category.destroy();

			res.status(200).json({
				message: "Category deleted successfully",
			});
		} catch (error) {
			res.status(500).json({
				message: "Error deleting category",
			});
		}
	},
	getCategoryById: async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		try {
			const category = await RecipeCategory.findByPk(Number(id));

			if (!category) {
				res.status(404).json({
					message: "Category not found",
				});
				return;
			}

			res.status(200).json(category);
		} catch (error) {
			res.status(500).json({
				message: "Error fetching category",
			});
		}
	},
	updateCategory: async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		let { name } = req.body as {
			name: string;
		};

		name = name.charAt(0).toUpperCase() + name.slice(1);

		try {
			const category = await RecipeCategory.findByPk(Number(id));
			if (!category) {
				res.status(404).json({ message: "Category not found" });
				return;
			}

			if (category.name === name) {
				res.status(409).json({ message: "Another category already has this name"})
				return;
			} 

			category.name = name;
			await category.save();

			res.status(200).json({
				message: "Category updated successfully",
				category,
			});
		} catch (error) {
			res.status(500).json({ message: "Error when updating category"})
		}
	},
};
