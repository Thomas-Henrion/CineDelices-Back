import sequelize from ".";
import argon2 from "argon2";
import {
	Recipe,
	User,
	Media,
	RecipeCategory,
	Ingredient,
	RecipeComposition,
	RecipeStep,
} from "./association";

sequelize
	.authenticate()
	.then(async () => {
		console.log("Database connection has been established successfully.");
		await sequelize.sync({ force: false });
		seedDatabase()
			.then(() => {
				console.log("Database seeded successfully.");
			})
			.catch((error) => {
				console.error("Error seeding database:", error);
			});
	})
	.catch((error) => {
		console.error("Unable to connect to the database:", error);
	});

const CreateUsers = async () => {
	const users = [
		{
			id: 1,
			username: "john_doe",
			email: "john@doe.fr",
			password: await argon2.hash("johnEstVraimentUnSuperPseudo"),
		},
	];

	for (const user of users) {
		const [newUser, created] = await User.findOrCreate({
			where: { id: user.id },
			defaults: user,
		});
	}
};

const CreateIngredients = async () => {
	const ingredients = [
		{
			id: 1,
			name: "Pasta",
		},
	];

	for (const ingredient of ingredients) {
		const [newIngredient, created] = await Ingredient.findOrCreate({
			where: { id: ingredient.id },
			defaults: ingredient,
		});
	}
};

const CreateRecipesComposition = async () => {
	const recipesComposition = [
		{
			id: 1,
			recipeId: 1,
			ingredientId: 1,
			quantity: 200,
			unit: "grams",
		},
	];

	for (const recipeComposition of recipesComposition) {
		const [newRecipeComposition, created] =
			await RecipeComposition.findOrCreate({
				where: { id: recipeComposition.id },
				defaults: recipeComposition,
			});
	}
};

const CreateMedias = async () => {
	const medias = [
		{
			id: 1,
			title: "Tempête de boulette géante",
			coverImage: "https://example.com/image1.jpg",
			anecdote: "Un film d'animation où la nourriture tombe du ciel.",
		},
	];

	for (const media of medias) {
		const [newMedia, created] = await Media.findOrCreate({
			where: { id: media.id },
			defaults: media,
		});
	}
};

const CreateRecipeCategories = async () => {
	const categories = [
		{
			id: 1,
			name: "Italian",
		},
	];

	for (const category of categories) {
		const [newCategory, created] = await RecipeCategory.findOrCreate({
			where: { id: category.id },
			defaults: category,
		});
	}
};

const CreateRecipes = async () => {
	const recipes = [
		{
			id: 1,
			name: "Spaghetti Bolognese",
			coverImg: "https://example.com/spaghetti.jpg",
			description: "A classic Italian pasta dish with a rich meat sauce.",
			authorId: 1,
			mediaId: 1,
			categoryId: 1,
			actif: true,
		},
	];

	for (const recipe of recipes) {
		const [recipeData, created] = await Recipe.findOrCreate({
			where: { id: recipe.id },
			defaults: recipe,
		});
	}
};

const CreateRecipesSteps = async () => {
    const recipeSteps = [
        {
            id: 1,
            description: "Cook the spaghetti according to package instructions.",
            recipeId: 1,
        },
    ];

    for (const step of recipeSteps) {
        const [newStep, created] = await RecipeStep.findOrCreate({
            where: { id: step.id },
            defaults: step,
        });
    }
}

const seedDatabase = async () => {
	await CreateUsers();
	await CreateMedias();
	await CreateIngredients();
	await CreateRecipeCategories();
	await CreateRecipesComposition();
	await CreateRecipes();
    await CreateRecipesSteps();
};
