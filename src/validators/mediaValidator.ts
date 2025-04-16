import Joi from "joi";

const getMediasQuerySchema = Joi.object({
	title: Joi.string().optional(),
	limit: Joi.number().positive().min(1).max(100).optional(),
	offset: Joi.number().integer().min(0).optional(),
});

export { getMediasQuerySchema };
