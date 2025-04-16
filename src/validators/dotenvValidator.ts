import Joi from "joi";

const DotenvSchema = Joi.object({
	DATABASE_HOST: Joi.string().required(),
	DATABASE_PORT: Joi.number().default(3306).required(),
	DATABASE_USER: Joi.string().required(),
	DATABASE_PASSWORD: Joi.string().required(),
	DATABASE_NAME: Joi.string().required(),

	CLOUDINARY_NAME: Joi.string().required(),
	CLOUDINARY_API_KEY: Joi.string().required(),
	CLOUDINARY_API_SECRET: Joi.string().required(),

	JWT_SECRET: Joi.string().min(16).required(),
	JWT_REFRESH_SECRET: Joi.string().min(16).required(),

	MAIL_APIKEY: Joi.string().required(),

	PORT: Joi.number().default(3000).required(),
});

export default DotenvSchema;
