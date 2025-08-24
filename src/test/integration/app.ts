import express from "express";
import sequelize from "../../database/index";
import ApiRouter from "../../routes/apiRoutes";
import config from "../../utils/dotenv";
import "../../database/association";
import bodyParser from "body-parser";
import type { ExpressJoiError } from "express-joi-validation";
import DotenvSchema from "../../validators/dotenvValidator";
import cors from "cors";
import { limiter } from "../../middlewares/rateLimitValidator";

// Validate the environment configuration
const { error } = DotenvSchema.validate(process.env, {
    abortEarly: false,
    allowUnknown: true,
});
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
if (process.env.NODE_ENV !== 'test') {
sequelize
    .authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
        sequelize.sync({ force: false });
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });
}

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json());
app.use(limiter);
app.use("/api", ApiRouter);

const ContainerTypes = ["body", "query", "headers", "fields", "params"];
app.use((err: ExpressJoiError, req, res, next) => {
    if (err?.type && ContainerTypes.includes(err.type)) {
        res.status(500).json({
            message: err.error.message,
            type: err.type,
        });
    } else {
        next(err);
    }
});

app.use((err: Error, _req, res, _next) => {
    res.status(404).json({ error: err.message });
});

export default app;
