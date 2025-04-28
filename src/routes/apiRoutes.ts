import express from "express";
import authRouter from "./authRoutes";
import categoryRouter from "./categoryRoutes";
import ingredientRouter from "./ingredientRoutes";
import meRouter from "./meRoutes";
import mediaRouter from "./mediaRoutes";
import recipesRouter from "./recipesRoutes";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/medias", mediaRouter);
apiRouter.use("/recipes", recipesRouter);
apiRouter.use("/me", meRouter);
apiRouter.use("/ingredients", ingredientRouter);

export default apiRouter;
