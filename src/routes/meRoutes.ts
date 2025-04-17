import express from "express";
import meController from "../controllers/meController"; 
import { isAuthenticated } from "../middlewares/authMiddleware";

const meRouter = express.Router();

meRouter.get("/", isAuthenticated, meController.getMyProfile);

export default meRouter;
