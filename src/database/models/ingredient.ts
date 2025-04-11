import { DataTypes, Model } from "sequelize";
import sequelize from "../index";

class Ingredient extends Model {}

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
		}
	},
	{
		sequelize,
	},
);

export default Ingredient;
