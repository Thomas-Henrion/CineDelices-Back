import { Model } from "sequelize";
import sequelize from "../index.mjs";

class Media extends Model {}

Media.init(
	{
		id: {
			type: sequelize.Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: sequelize.Sequelize.STRING,
			allowNull: false,
		},
		coverImage: {
			type: sequelize.Sequelize.STRING,
			allowNull: false,
		},
		anecdote: {
			type: sequelize.Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
	},
);

export default Media;
