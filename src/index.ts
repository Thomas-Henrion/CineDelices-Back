import config from "./utils/dotenv";
import express from "express";
import ApiRouter from "./routes/apiRoutes";
import sequelize from "./database/index";
import "./database/association";
import DotenvSchema from "./validators/dotenvValidator";
import type { ExpressJoiError } from "express-joi-validation";

// Validation de la configuration de l'environnement
const { error } = DotenvSchema.validate(process.env, {
	abortEarly: false,
	allowUnknown: true,
});
if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

sequelize
	.authenticate()
	.then(() => {
		console.log("Database connection has been established successfully.");
		sequelize.sync({ force: false });
	})
	.catch((error) => {
		console.error("Unable to connect to the database:", error);
	});

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "app/views");
app.use(express.static("public"));

// Utiliser les routes pour l'api
app.use("/api", ApiRouter);

// On veux traiter les erreurs de validation Joi
const ContainerTypes = ["body", "query", "headers", "fields", "params"];
app.use(
	(
		err: ExpressJoiError,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		if (err?.type && ContainerTypes.includes(err.type)) {
			res.status(400).json({
				message: err.error.message,
				type: err.type,
			});
		} else {
			next(err);
		}
	},
);

app.listen(config.PORT, () => {
	console.log(`Server is running on http://localhost:${config.PORT}`);
});
