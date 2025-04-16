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
	as: "Author",
});
User.hasMany(Recipe, {
	foreignKey: "authorId",
	as: "CreatedRecipes",
});

// A Recipe belongs to a Media (e.g., image) and a Media can be associated with many Recipes
Recipe.belongsTo(Media, {
	foreignKey: "mediaId",
	as: "Media",
});
Media.hasMany(Recipe, {
	foreignKey: "mediaId",
	as: "Recipes",
});

// A Recipe belongs to a RecipeCategory and a RecipeCategory can have many Recipes
Recipe.belongsTo(RecipeCategory, {
	foreignKey: "categoryId",
	as: "Category",
});
RecipeCategory.hasMany(Recipe, {
	foreignKey: "categoryId",
	as: "Recipes",
});

// A Recipe has many RecipeSteps and a RecipeStep belongs to a Recipe
Recipe.hasMany(RecipeStep, {
	foreignKey: "recipeId",
	as: "Steps",
});
RecipeStep.belongsTo(Recipe, {
	foreignKey: "recipeId",
	as: "Recipe",
});

// A Recipe has many RecipeCompositions and a RecipeComposition belongs to a Recipe
Recipe.hasMany(RecipeComposition, {
	foreignKey: "recipeId",
	as: "Compositions",
});
RecipeComposition.belongsTo(Recipe, {
	foreignKey: "recipeId",
	as: "Recipe",
});

// A RecipeComposition belongs to an Ingredient and an Ingredient can be part of many RecipeCompositions
RecipeComposition.belongsTo(Ingredient, {
	foreignKey: "ingredientId",
	as: "Ingredient",
});
Ingredient.hasMany(RecipeComposition, {
	foreignKey: "ingredientId",
	as: "Compositions",
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
