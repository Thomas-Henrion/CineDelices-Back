import { Sequelize } from "sequelize";
import config from "../utils/dotenv";

/**
 * Initializes a Sequelize instance for connecting to a MariaDB database.
 */
const sequelize = new Sequelize({
	dialect: "mariadb",
	host: config.DATABASE.HOST,
	port: Number.parseInt(config.DATABASE.PORT || "3306", 10),
	username: config.DATABASE.USER,
	password: config.DATABASE.PASS,
	database: config.DATABASE.NAME,
	logging: false,
	define: {
		timestamps: true,
	},
});

export default sequelize;
