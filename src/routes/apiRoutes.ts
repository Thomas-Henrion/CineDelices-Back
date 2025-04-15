import express from "express";
import authRouter from "./authRoutes";
import categoryRouter from "./categoryRoutes";
import mediaRouter from "./mediaRoutes";
import recipesRouter from "./recipesRoutes";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/media", mediaRouter);
apiRouter.use("/recipes", recipesRouter);

export default apiRouter;
