import { DataTypes, Model } from "sequelize";
import sequelize from "../index";
import type Recipe from "./recipe";

class User extends Model {
	declare id: number;
	declare username: string;
	declare email: string;
	declare password: string;
	declare verificationCode: number | null;
	declare role: "admin" | "user";

	// Associations
	declare CreatedRecipes?: Recipe[];
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		verificationCode: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		role: {
			type: DataTypes.ENUM("admin", "user"),
			defaultValue: "user",
		},
	},
	{
		sequelize,
		defaultScope: {
			attributes: { exclude: ["password", "verificationCode"] },
		},
	},
);

export default User;
