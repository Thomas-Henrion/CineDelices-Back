import express from "express";
import ingredientController from "../controllers/ingredientController";

const ingredientRouter = express.Router();

ingredientRouter.get("/", ingredientController.getAll);

export default ingredientRouter;
