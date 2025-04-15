import Joi from "joi";

const createCategorySchema = Joi.object({
    name: Joi.string().min(3).max(15).required().messages({
        "string.empty": "Category name is required",
        "string.min": "Category name must be at least 3 characters long",
        "string.max": "Category name must be at most 15 characters long",
        "any.required": "Category name is required",
    })
})

const updateCategorySchema = Joi.object({
    name: Joi.string().min(3).max(15).optional().messages({
        "string.base": "Category name is required",
        "string.min": "Category name must be at least 3 characters long",
        "string.max": "Category name must be at most 15 characters long",
    })
})

export { createCategorySchema, updateCategorySchema};