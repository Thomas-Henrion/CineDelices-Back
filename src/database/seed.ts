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
		{
			id: 2,
			name: "Tomato Sauce",
		},
		{
			id: 3,
			name: "Ground Beef",
		},
		{
			id: 4,
			name: "Onion",
		},
		{
			id: 5,
			name: "Garlic",
		},
		{
			id: 6,
			name: "Olive Oil",
		},
		{
			id: 7,
			name: "Salt",
		},
		{
			id: 8,
			name: "Pepper",
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
		{
			id: 2,
			recipeId: 2,
			ingredientId: 2,
			quantity: 1,
			unit: "cup",
		},
		{
			id: 3,
			recipeId: 3,
			ingredientId: 3,
			quantity: 300,
			unit: "grams",
		},
		{
			id: 4,
			recipeId: 4,
			ingredientId: 4,
			quantity: 1,
			unit: "piece",
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
			coverImage: "https://picsum.photos/200",
			anecdote: "Un film d'animation où la nourriture tombe du ciel.",
		},
		{
			id: 2,
			title: "Ratatouille",
			coverImage: "https://picsum.photos/200",
			anecdote: "Un rat qui cuisine à Paris.",
		},
		{
			id: 3,
			title: "Julie & Julia",
			coverImage: "https://picsum.photos/200",
			anecdote: "Deux histoires de cuisine entrelacées.",
		},
		{
			id: 4,
			title: "Chef",
			coverImage: "https://picsum.photos/200",
			anecdote:
				"Un chef qui part sur la route avec un camion de nourriture.",
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
			name: "Deserts",
		},
		{
			id: 2,
			name: "Entrées",
		},
		{
			id: 3,
			name: "Plats principaux",
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
			coverImg: "https://picsum.photos/200",
			description: "A classic Italian pasta dish with a rich meat sauce.",
			authorId: 1,
			mediaId: 1,
			categoryId: 1,
			actif: true,
		},
		{
			id: 2,
			name: "Chocolate Cake",
			coverImg: "https://picsum.photos/200",
			description: "A rich and moist chocolate cake.",
			authorId: 1,
			mediaId: 2,
			categoryId: 2,
			actif: true,
		},
		{
			id: 3,
			name: "Caesar Salad",
			coverImg: "https://picsum.photos/200",
			description:
				"A fresh salad with romaine lettuce, croutons, and Caesar dressing.",
			authorId: 1,
			mediaId: 3,
			categoryId: 3,
			actif: true,
		},
		{
			id: 4,
			name: "Grilled Chicken",
			coverImg: "https://picsum.photos/200",
			description: "Juicy grilled chicken with herbs and spices.",
			authorId: 1,
			mediaId: 4,
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
			description:
				"Cook the spaghetti according to package instructions.",
			recipeId: 1,
		},
		{
			id: 2,
			description:
				"In a pan, heat olive oil and sauté chopped onions and garlic.",
			recipeId: 2,
		},
		{
			id: 3,
			description: "Add ground beef to the pan and cook until browned.",
			recipeId: 3,
		},
		{
			id: 4,
			description: "Stir in tomato sauce and let simmer for 20 minutes.",
			recipeId: 4,
		},
	];

	for (const step of recipeSteps) {
		const [newStep, created] = await RecipeStep.findOrCreate({
			where: { id: step.id },
			defaults: step,
		});
	}
};

const seedDatabase = async () => {
	await CreateUsers();
	await CreateMedias();
	await CreateIngredients();
	await CreateRecipeCategories();
	await CreateRecipes();
	await CreateRecipesComposition();
	await CreateRecipesSteps();
};
