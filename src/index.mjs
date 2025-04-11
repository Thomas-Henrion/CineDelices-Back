import config from "./utils/dotenv.mjs";
import express from "express";
import routes from "./routes/indexRoutes.mjs";
import sequelize from "./database/index.mjs";
import "./database/association.mjs"

sequelize
	.authenticate()
	.then(() => {
		console.log("Database connection has been established successfully.");
		sequelize.sync({ force: true });
	})
	.catch((error) => {
		console.error("Unable to connect to the database:", error);
	});

const app = express();

app.set("view engine", "ejs");
app.set("views", "app/views");
app.use(express.static("public"));

// app.use(router);

app.listen(config.PORT, () => {
	console.log(`Server is running on http://localhost:${config.PORT}`);
});
