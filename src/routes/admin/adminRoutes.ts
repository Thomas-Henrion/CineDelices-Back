import  express  from "express";

import mediasRouter from "./mediasRoutes";
import recipesRouter from "../recipesRoutes";
import usersRouter from "./usersRoutes";
import ingredientsRouter from "./ingredientsRoutes";
import categoriesRouter from "./categoriesRoutes";


const adminRouter = express.Router();

adminRouter.use("/medias", mediasRouter);
adminRouter.use("/recipes", recipesRouter);
adminRouter.use("/users", usersRouter);
adminRouter.use("/ingredients", ingredientsRouter);
adminRouter.use("/categories", categoriesRouter);

export default adminRouter;