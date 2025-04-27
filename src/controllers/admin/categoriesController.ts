import { RecipeCategory } from "../../database/association";
import type { Request, Response } from "express";

export default {

  getAllCategories: async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await RecipeCategory.findAll();
      res.render("categories/categories", { categories });
    } catch (error) {
      res.render("404");
    }
  },
  createForm: async (req: Request, res: Response): Promise<void> => {
		try {
		  res.render("categories/addCategory");
		} catch (error) {
		  res.status(500).send("Error rendering create media form");
		}
	  },

	createCategory: async (req: Request, res: Response): Promise<void> => {
		try {
			const category = await RecipeCategory.create(req.body);
			
			res.redirect("/admin/categories");
		} catch (error) {
			res.status(500).send("Error creating category");
		}
	},
	
	deleteCategory: async (req: Request, res: Response): Promise<void> => {
		try {
		  const { id } = req.params;
		  await RecipeCategory.destroy({ where: { id } });
		  res.redirect("/admin/categories");
		} catch (error) {
		  res.status(500).send("Error deleting category");
		}
	  },
 
};