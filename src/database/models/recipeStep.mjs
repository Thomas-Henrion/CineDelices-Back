import { Model } from "sequelize";
import sequelize from "../index.mjs";

class RecipeStep extends Model {}

RecipeStep.init(
	{
		id: {
			type: sequelize.Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		description: {
			type: sequelize.Sequelize.STRING,
			allowNull: false,
		},
		recipeId: {
			type: sequelize.Sequelize.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
	},
);

export default RecipeStep;
