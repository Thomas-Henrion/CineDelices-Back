import  express  from "express";

import mediasRouter from "./mediasRoutes";
import recipesRouter from "./recipesRoutes";
import usersRouter from "./usersRoutes";
import ingredientsRouter from "./ingredientsRoutes";
import categoriesRouter from "./categoriesRoutes";
import authRouter from "./authRoutes";


const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
  res.render('main')});

  
adminRouter.use("/medias", mediasRouter);
adminRouter.use("/recipes", recipesRouter);
adminRouter.use("/users", usersRouter);
adminRouter.use("/ingredients", ingredientsRouter);
adminRouter.use("/categories", categoriesRouter);
adminRouter.use("/auth", authRouter);

export default adminRouter;