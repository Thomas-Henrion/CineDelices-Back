import { Model } from "sequelize";
import sequelize from "../index.mjs";

class User extends Model {}

User.init(
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
		email: {
			type: sequelize.Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: sequelize.Sequelize.STRING,
			allowNull: false,
		},
		vericationCode: {
			type: sequelize.Sequelize.STRING,
			allowNull: true,
		},
		role: {
			type: sequelize.Sequelize.ENUM("admin", "user"),
			defaultValue: "user",
		},
	},
	{
		sequelize,
	},
);

export default User;
