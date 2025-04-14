import "dotenv/config";

export default {
	NODE_ENV: process.env.NODE_ENV as string,
	PORT: process.env.PORT as string,

	DATABASE: {
		HOST: process.env.DATABASE_HOST as string,
		USER: process.env.DATABASE_USER as string,
		PASS: process.env.DATABASE_PASSWORD as string,
		NAME: process.env.DATABASE_NAME as string,
		PORT: process.env.DATABASE_PORT as string,
	},

	MAIL: {
		APIKEY: process.env.MAIL_APIKEY as string,
	},
};
