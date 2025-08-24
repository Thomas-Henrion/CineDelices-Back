import { Ingredient } from "../../database/association";
import type { Request, Response } from "express";


export default {

    getAllIngredients: async (req: Request, res: Response): Promise<void> => {
        try {
            const ingredients = await Ingredient.findAll();
            res.render("ingredients/ingredients", { ingredients });
        } catch (error) {
            res.render("404");
        }
    },


    createForm: async (req: Request, res: Response): Promise<void> => {
        try {
            res.render("ingredients/addIngredient");
        } catch (error) {   
            console.error("Erreur serveur :", error);
            res.status(500).send("Error rendering create form");
        }
    },

    createIngredient: async (req: Request, res: Response): Promise<void> => {
        try {
            const { name } = req.body;
            const newIngredient = await Ingredient.create(req.body);
            res.redirect("/admin/ingredients");
        } catch (error) {
            console.error("Erreur serveur :", error);
            res.status(500).send("Error creating ingredient");
        }
    },

    deleteIngredient: async (req: Request, res: Response): Promise<void> => {
        try {
            const deleteID = req.params.id;
            const ingredient = await Ingredient.findByPk(deleteID);
            if (!ingredient) {
                res.status(404).send("Ingredient not found");
                return;
            }
            await ingredient.destroy();
            res.redirect("/admin/ingredients");
        } catch (error) {
            console.error("Erreur serveur :", error);
            res.status(500).send("Error deleting ingredient");
        }
    },

   
}