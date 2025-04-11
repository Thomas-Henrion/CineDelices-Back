import config from "./utils/dotenv.mjs";
import express from "express";

import "./database/index.mjs";

const app = express();

app.set("view engine", "ejs");
app.set("views", "app/views");
app.use(express.static("public"));

// app.use(router);

app.listen(config.PORT, () => {
	console.log(`Server is running on http://localhost:${config.PORT}`);
});
