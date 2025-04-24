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

 
};