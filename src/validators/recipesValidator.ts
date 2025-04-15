import Joi from "joi";

const CreateRecipeSchema = Joi.object({
	name: Joi.string().min(3).max(100).required(),
	coverImg: Joi.string().uri().required(),
	description: Joi.string().min(10).max(5000).required(),
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
				description: Joi.string().min(5).max(500).required(),
			}),
		)
		.required(),
});

export { CreateRecipeSchema };
