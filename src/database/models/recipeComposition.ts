import { DataTypes, Model } from "sequelize";
import sequelize from "../index";

class RecipeComposition extends Model {}

RecipeComposition.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		recipeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		ingredientId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		unit: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
	},
);

export default RecipeComposition;
