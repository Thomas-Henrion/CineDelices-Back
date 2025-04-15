import { DataTypes, Model } from "sequelize";
import sequelize from "../index";

class Recipe extends Model {
	declare id: number;
	declare name: string;
	declare coverImg: string;
	declare description: string;
	declare authorId: number;
	declare mediaId: number;
	declare categoryId: number;
	declare actif: boolean;
}

Recipe.init(
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
		coverImg: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		authorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		mediaId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		categoryId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		actif: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		sequelize,
	},
);

export default Recipe;
