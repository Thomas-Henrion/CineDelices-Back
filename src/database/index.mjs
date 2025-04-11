import { Sequelize } from "sequelize";
import config from "../utils/dotenv.mjs";

const sequelize = new Sequelize({
	dialect: "mariadb",
	host: config.DATABASE.HOST,
	port: config.DATABASE.PORT,
	username: config.DATABASE.USER,
	password: config.DATABASE.PASS,
	database: config.DATABASE.NAME,
	logging: console.log,
	define: {
		timestamps: false,
	}
});

export default sequelize;
