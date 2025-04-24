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

    validateRecipeById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
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
            res.status(500).send("Internal server error");
        }
    }
    
}