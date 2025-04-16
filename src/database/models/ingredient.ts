import { DataTypes, Model } from "sequelize";
import sequelize from "../index";
import type RecipeComposition from "./recipeComposition";

class Ingredient extends Model {
	declare id: number;
	declare name: string;

	// Associations
	declare Compositions?: RecipeComposition[];
}

Ingredient.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
	},
);

export default Ingredient;
