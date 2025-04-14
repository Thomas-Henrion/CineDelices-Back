import { DataTypes, Model } from "sequelize";
import sequelize from "../index";

class User extends Model {
	declare id: number;
	declare name: string;
	declare email: string;
	declare password: string;
	declare verificationCode: number | null;
	declare role: "admin" | "user";
}

User.init(
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
	},
);

export default User;
