import Joi from "joi";
import { sanitizeTextSchema } from "../utils/sanitizeText";

const CreateRecipeSchema = Joi.object({
	name: sanitizeTextSchema.min(3).max(100).required(),
	description: sanitizeTextSchema.min(10).max(5000).required(),
	authorId: Joi.number().integer().positive().required(),
	mediaId: Joi.number().integer().positive().required(),
	categoryId: Joi.number().integer().positive().required(),
	composition: Joi.array()
		.items(
			Joi.object({
				ingredientId: Joi.number().integer().positive().required(),
				quantity: Joi.number().positive().required(),
				unit: Joi.string().required(),
			}),
		)
		.required(),
	steps: Joi.array()
		.items(
			Joi.object({
				description: sanitizeTextSchema.min(5).max(500).required(),
			}),
		)
		.required(),
});

const getRecipesQuerySchema = Joi.object({
	name: Joi.string().optional(),
	ingredientsIds: Joi.string().pattern(/^\d+(,\d+)*$/),
	limit: Joi.number().positive().min(1).max(100).optional(),
	offset: Joi.number().integer().min(0).optional(),
	random: Joi.boolean().optional(),
});

export { CreateRecipeSchema, getRecipesQuerySchema };
