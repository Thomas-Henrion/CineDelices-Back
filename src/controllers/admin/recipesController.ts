import { valid } from "joi";
import { Recipe } from "../../database/association";
import type { Request, Response } from "express";

export default {
    
    getAllRecipes: async (req: Request, res: Response): Promise<void> => {
        try {
            const recipes = await Recipe.findAll(
               { include : [
                {
                    association : "Category",
                },
                {
                    association :"Media"
                },
                {
                    association: "Author"
                }
                ]
        });
            res.render("recipes/recipes", {recipes});
        } catch (error) {
            res.render("404")
        }
    },

    validateRecipesById: async (req: Request, res: Response): Promise<void> => {
        try {
            const recipe = await Recipe.findByPk(id,{
                include : [
                    {
                        association : "Compositions",
                    },
                    {
                        association :"Steps"
                    },
                    {
                        association: "Ingredient"
                    }
                ]
            });
            if (!recipe) {
                res.status(404).send("Recipe not found");
                return;
            }
            console.log(recipe);
            
            res.render("recipes/validateRecipe", { recipe });
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

