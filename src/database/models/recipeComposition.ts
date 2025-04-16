import { DataTypes, Model } from "sequelize";
import sequelize from "../index";
import type Recipe from "./recipe";
import type Ingredient from "./ingredient";

class RecipeComposition extends Model {
	declare id: number;
	declare recipeId: number;
	declare ingredientId: number;
	declare quantity: string;
	declare unit: string;

	// Associations
	declare Recipe?: Recipe;
	declare Ingredient?: Ingredient;
}

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
