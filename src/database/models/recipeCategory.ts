import { DataTypes, Model } from "sequelize";
import sequelize from "../index";
import type Recipe from "./recipe";

class RecipeCategory extends Model {
	declare id: number;
	declare name: string;

	// Associations
	declare Recipes?: Recipe[];
}

RecipeCategory.init(
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

export default RecipeCategory;
