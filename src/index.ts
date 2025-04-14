import config from "./utils/dotenv";
import express from "express";
import routes from "./routes/indexRoutes";
import sequelize from "./database/index";
import "./database/association";

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
app.use("/", routes);

app.listen(config.PORT, () => {
	console.log(`Server is running on http://localhost:${config.PORT}`);
});
