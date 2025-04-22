import { Recipe } from "../../database/association";
import type { Request, Response } from "express";

export default {
    
    getAllRecipes: async (req: Request, res: Response): Promise<void> => {
        try {
            const recipes = await Recipe.findAll();
            res.render("recipes", {recipes});
        } catch (error) {
            res.render("404")
        }
    },
    
}