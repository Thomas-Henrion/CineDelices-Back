import { DataTypes, Model } from "sequelize";
import sequelize from "../index";

class Media extends Model {}

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
