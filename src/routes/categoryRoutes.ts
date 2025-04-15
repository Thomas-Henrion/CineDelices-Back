import express from "express";
import categoryController from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);

export default categoryRouter;
