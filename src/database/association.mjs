import Ingredient from "./models/ingredient.mjs";
import Media from "./models/media.mjs";
import Recipe from "./models/recipe.mjs";
import RecipeCategory from "./models/recipeCategory.mjs";
import RecipeComposition from "./models/recipeComposition.mjs";
import RecipeStep from "./models/recipeStep.mjs";
import User from "./models/user.mjs";

Recipe.belongsTo(User, {
	foreignKey: "authorId",
});
User.hasMany(Recipe, {
	foreignKey: "authorId",
});

Recipe.belongsTo(Media, {
	foreignKey: "mediaId",
});
Media.hasMany(Recipe, {
	foreignKey: "mediaId",
});

Recipe.belongsTo(RecipeCategory, {
	foreignKey: "categoryId",
});
RecipeCategory.hasMany(Recipe, {
	foreignKey: "categoryId",
});

Recipe.hasMany(RecipeStep, {
	foreignKey: "recipeId",
});
RecipeStep.belongsTo(Recipe, {
	foreignKey: "recipeId",
});

Recipe.hasMany(RecipeComposition, {
	foreignKey: "recipeId",
});
RecipeComposition.belongsTo(Recipe, {
	foreignKey: "recipeId",
});

RecipeComposition.belongsTo(Ingredient, {
	foreignKey: "ingredientId",
});
Ingredient.hasMany(RecipeComposition, {
	foreignKey: "ingredientId",
});

export default {
	Recipe,
	User,
	Media,
	RecipeCategory,
	RecipeStep,
	RecipeComposition,
	Ingredient,
};
