import { DataTypes, Model } from "sequelize";
import sequelize from "../index";

class RecipeStep extends Model {}

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
