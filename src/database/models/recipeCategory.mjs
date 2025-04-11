import { Model } from "sequelize";
import sequelize from "../index.mjs";

class RecipeCategory extends Model {}

RecipeCategory.init(
	{
		id: {
			type: sequelize.Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: sequelize.Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
	},
);

export default RecipeCategory;
