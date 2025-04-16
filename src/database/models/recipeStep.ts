import { DataTypes, Model } from "sequelize";
import sequelize from "../index";
import type Recipe from "./recipe";

class RecipeStep extends Model {
	declare id: number;
	declare recipeId: number;
	declare stepNumber: number;
	declare description: string;

	// Associations
	declare Recipe?: Recipe;
}

RecipeStep.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		recipeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
	},
);

export default RecipeStep;
