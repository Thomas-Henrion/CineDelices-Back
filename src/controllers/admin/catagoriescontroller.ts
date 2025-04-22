import { RecipeCategory } from "../../database/association";
import { Request, Response } from "express";

export default {

  getAllCategories: async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await RecipeCategory.findAll();
      res.render("categories", { categories });
    } catch (error) {
      res.render("404");
    }
  },

  // getCategoryById: async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   try {
  //     const category = await RecipeCategory.findByPk(id);
  //     if (!category) {
  //       return res.status(404).json({ error: "Category not found" });
  //     }
  //     return res.status(200).json(category);
  //   } catch (error) {
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // },
};