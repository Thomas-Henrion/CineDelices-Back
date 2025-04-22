import { Ingredient } from "../../database/association";
import type { Request, Response } from "express";


export default {
    getAllIngredients: async (req: Request, res: Response): Promise<void> => {
        try {
            const ingredients = await Ingredient.findAll();
            res.render("ingredients", { ingredients });
        } catch (error) {
            res.render("404");
        }
    }
}