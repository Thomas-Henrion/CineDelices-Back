import  express  from "express";

import mediasRouter from "./mediasRoutes";
import recipesRouter from "./recipesRoutes";
import usersRouter from "./usersRoutes";
import ingredientsRouter from "./ingredientsRoutes";
import categoriesRouter from "./categoriesRoutes";
<<<<<<< HEAD
import authRouter from "./authRoutes";

=======
import authRouter from "./authRoutes"
>>>>>>> 08fd263a565f0711c4a1a825091c6dcfed039231

const adminRouter = express.Router();



adminRouter.get("/dashboard", (req, res) => {
res.render('main')});
adminRouter.use("/auth",authRouter)
adminRouter.use("/medias", mediasRouter);
adminRouter.use("/recipes", recipesRouter);
adminRouter.use("/users", usersRouter);
adminRouter.use("/ingredients", ingredientsRouter);
adminRouter.use("/categories", categoriesRouter);
adminRouter.use("/auth", authRouter);

export default adminRouter;