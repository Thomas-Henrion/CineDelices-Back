import Ingredient from "./models/ingredient";
import Media from "./models/media";
import Recipe from "./models/recipe";
import RecipeCategory from "./models/recipeCategory";
import RecipeComposition from "./models/recipeComposition";
import RecipeStep from "./models/recipeStep";
import User from "./models/user";

// A Recipe belongs to a User (author) and a User can have many Recipes
Recipe.belongsTo(User, {
	foreignKey: "authorId",
});
User.hasMany(Recipe, {
	foreignKey: "authorId",
});

// A Recipe belongs to a Media (e.g., image) and a Media can be associated with many Recipes
Recipe.belongsTo(Media, {
	foreignKey: "mediaId",
});
Media.hasMany(Recipe, {
	foreignKey: "mediaId",
});

// A Recipe belongs to a RecipeCategory and a RecipeCategory can have many Recipes
Recipe.belongsTo(RecipeCategory, {
	foreignKey: "categoryId",
});
RecipeCategory.hasMany(Recipe, {
	foreignKey: "categoryId",
});

// A Recipe has many RecipeSteps and a RecipeStep belongs to a Recipe
Recipe.hasMany(RecipeStep, {
	foreignKey: "recipeId",
});
RecipeStep.belongsTo(Recipe, {
	foreignKey: "recipeId",
});

// A Recipe has many RecipeCompositions and a RecipeComposition belongs to a Recipe
Recipe.hasMany(RecipeComposition, {
	foreignKey: "recipeId",
});
RecipeComposition.belongsTo(Recipe, {
	foreignKey: "recipeId",
});

// A RecipeComposition belongs to an Ingredient and an Ingredient can be part of many RecipeCompositions
RecipeComposition.belongsTo(Ingredient, {
	foreignKey: "ingredientId",
});
Ingredient.hasMany(RecipeComposition, {
	foreignKey: "ingredientId",
});

export {
	Recipe,
	User,
	Media,
	RecipeCategory,
	RecipeStep,
	RecipeComposition,
	Ingredient,
};
