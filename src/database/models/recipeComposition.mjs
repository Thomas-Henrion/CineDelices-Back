import { Model } from "sequelize";
import sequelize from "../index.mjs";

class RecipeComposition extends Model {}

RecipeComposition.init(
	{
		id: {
			type: sequelize.Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		recipeId: {
			type: sequelize.Sequelize.INTEGER,
			allowNull: false,
		},
		ingredientId: {
			type: sequelize.Sequelize.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: sequelize.Sequelize.STRING,
			allowNull: false,
		},
		unit: {
			type: sequelize.Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
	},
);

export default RecipeComposition;
