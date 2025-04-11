import { Model } from "sequelize";
import sequelize from "../index.mjs";

class Recipe extends Model {}

Recipe.init(
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
		coverImg: {
			type: sequelize.Sequelize.STRING,
			allowNull: true,
		},
		description: {
			type: sequelize.Sequelize.STRING,
			allowNull: false,
		},
		authorId: {
			type: sequelize.Sequelize.INTEGER,
			allowNull: false,
		},
		mediaId: {
			type: sequelize.Sequelize.INTEGER,
			allowNull: false,
		},
		categoryId: {
			type: sequelize.Sequelize.INTEGER,
			allowNull: false,
		},
		actif: {
			type: sequelize.Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	},
	{
		sequelize,
	},
);

export default Recipe;
