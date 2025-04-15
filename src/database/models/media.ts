import { DataTypes, Model } from "sequelize";
import sequelize from "../index";
import type { Recipe } from "../association";

class Media extends Model {
	declare id: number;
	declare title: string;
	declare coverImage: string;
	declare anecdote: string;

	declare Recipes?: Recipe[];
}

Media.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		coverImage: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		anecdote: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
	},
);

export default Media;
