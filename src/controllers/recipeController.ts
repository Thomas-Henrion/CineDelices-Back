import type { Request, Response } from "express";
import type { FindOptions } from "sequelize";
import { Op, Sequelize } from "sequelize";
import {
    Media,
    Recipe,
    RecipeCategory,
    RecipeComposition,
    RecipeStep,
} from "../database/association";

export default {
    getRecipeById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const recipe = await Recipe.findByPk(id, {
                include: [
                    {
                        association: "Compositions",
                        include: [
                            {
                                association: "Ingredient",
                            },
                        ],
                    },
                    {
                        association: "Steps",
                    },
                    {
                        association: "Media",
                    },
                    {
                        association: "Author"
                    }
                ],
            });

            if (!recipe) {
                res.status(404).json({ message: "Recipe not found" });
                return;
            }

            res.status(200).json(recipe);
        } catch (error) {
            res.status(500).json({ message: "Error fetching recipe", error });
        }
    },
    createRecipe: async (req: Request, res: Response): Promise<void> => {
        const {
            name,
            description,
            authorId,
            mediaId,
            categoryId,
            composition,
            steps,
        } = req.body as {
            name: string;
            description: string;
            authorId: number;
            mediaId: number;
            categoryId: number;
            composition: {
                ingredientId: number;
                quantity: number;
                unit: string;
            }[];
            steps: { description: string }[];
        };

        try {
            const media = await Media.findByPk(mediaId);
            if (!media) {
                res.status(404).json({ message: "Media not found" });
                return;
            }

            const category = await RecipeCategory.findByPk(categoryId);
            if (!category) {
                res.status(404).json({ message: "Recipe category not found" });
                return;
            }

            const recipe = await Recipe.create(
                {
                    name,
                    description,
                    authorId,
                    mediaId,
                    categoryId,
                    Compositions: composition.map((item) => ({
                        ingredientId: item.ingredientId,
                        quantity: item.quantity,
                        unit: item.unit,
                    })),
                    Steps: steps.map((item) => ({
                        description: item.description,
                    })),
                },
                {
                    include: [
                        {
                            association: "Compositions",
                            include: [
                                {
                                    association: "Ingredient",
                                },
                            ],
                        },
                        {
                            association: "Steps",
                        },
                        {
                            association: "Media",
                        },
                        {
                            association: "Category",
                        },
                    ],
                },
            );

            res.status(201).json(recipe);
        } catch (error) {
            res.status(500).json({ message: "Error creating recipe", error });
        }
    },
    updateRecipeCoverImg: async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const { recipeId } = req.params;
        const coverImg = req.file as Express.Multer.File;

        try {
            const recipe = await Recipe.findByPk(recipeId);
            if (!recipe) {
                res.status(404).json({ message: "Recipe not found" });
                return;
            }

            recipe.coverImg = coverImg.path;
            await recipe.save();

            res.status(200).json(recipe);
        } catch (error) {
            res.status(500).json({ message: "Error updating recipe", error });
        }
    },
    getRecipes: async (req: Request, res: Response): Promise<void> => {
        const {
            name,
            categoryId,
            ingredientsIds,
            limit = "25",
            offset = "0",
            random = "false",
        } = req.query as {
            name: string;
            categoryId: string;
            ingredientsIds: unknown;
            limit: string;
            offset: string;
            random: string;
        };

        const numLimit = Number.parseInt(limit, 10);
        const numOffset = Number.parseInt(offset, 10);
        const isRandom = random === "true";

        // Build the base query
        let where = {};
        if (name) {
            where = {
                ...where,
                name: {
                    [Op.like]: `%${name}%`,
                },
            };
        }

        if (categoryId) {
            where = {
                ...where,
                categoryId: Number(categoryId),
            };
        }

        // Base query options
        const queryOptions: FindOptions<Recipe> = {
            where,
            limit: numLimit,
            offset: numOffset,
            include: [
                {
                    association: "Composition",
                    include: [
                        {
                            association: "Ingredient",
                        },
                    ],
                },
                {
                    association: "Media",
                },
                {
                    association: "Author",
                    attributes: ["id", "username"],
                },
                {
                    association: "Category",
                },
            ],
            order: isRandom ? [Sequelize.literal("RAND()")] : undefined
        };

        // If ingredient IDs are specified, add the inclusion condition
        if (ingredientsIds) {
            const ingredientIdsArray = (ingredientsIds as string)
                .split(",")
                .map((id) => Number.parseInt(id));

            queryOptions.include = [
                {
                    association: "Compositions",
                    include: [
                        {
                            association: "Ingredient",
                        },
                    ],
                    where: {
                        ingredientId: {
                            [Op.in]: ingredientIdsArray,
                        },
                    },
                },
                {
                    association: "Media",
                },
                {
                    association: "Author",
                    attributes: ["id", "username"],
                },
                {
                    association: "Category",
                },
            ];
        } else {
            // If no ingredient is specified, still include compositions, but without filtering
            queryOptions.include = [
                {
                    association: "Compositions",
                    required: false, // Makes this inclusion optional (LEFT JOIN)
                    include: [
                        {
                            association: "Ingredient",
                        },
                    ],
                },
                {
                    association: "Media",
                },
                {
                    association: "Author",
                    attributes: ["id", "username"],
                },
                {
                    association: "Category",
                },
            ];
        }

        const recipes = await Recipe.findAll(queryOptions);
        res.status(200).json(recipes);
    },
};
