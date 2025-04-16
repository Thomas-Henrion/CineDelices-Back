import { DataTypes, Model } from "sequelize";
import sequelize from "../index";
import type User from "./user";
import type Media from "./media";
import type RecipeCategory from "./recipeCategory";
import type RecipeStep from "./recipeStep";
import type RecipeComposition from "./recipeComposition";

class Recipe extends Model {
	declare id: number;
	declare name: string;
	declare coverImg?: string;
	declare description: string;
	declare authorId: number;
	declare mediaId: number;
	declare categoryId: number;
	declare actif: boolean;

	// Associations
	declare Author?: User;
	declare Media?: Media;
	declare Category?: RecipeCategory;
	declare Steps?: RecipeStep[];
	declare Compositions?: RecipeComposition[];
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
			allowNull: true,
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
