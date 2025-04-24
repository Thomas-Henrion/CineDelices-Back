import { Recipe } from "../../database/association";
import type { Request, Response } from "express";

export default {
    
    getAllRecipes: async (req: Request, res: Response): Promise<void> => {
        try {
            const recipes = await Recipe.findAll();
            res.render("recipes/recipes", {recipes});
        } catch (error) {
            res.render("404")
        }
    },

    validateRecipesById: async (req: Request, res: Response): Promise<void> => {
        try {
            const validateId = req.params.id;

            const recipes = await Recipe.findByPk(validateId);
        if (!recipes) {
            res.status(404).send("Recipe par ID not found");
            return;
        }
        res.render("recipes/validateRecipe", { recipes });
        } catch (error) {
        res.status(500).send("Error fetching recipes");
    }
    },

    deleteRecipeById: async (req: Request, res: Response): Promise<void> => {
        try {
            const deleteId = req.params.id;

            const recipes = await Recipe.findByPk(deleteId);
        if (!recipes) {
            res.status(404).send("Recipe par ID not found");
            return;
        }
        await recipes.destroy();
        res.redirect("/admin/recipes");
        } catch (error) {
        res.status(500).send("Error fetching recipes");
    }
    },
}

