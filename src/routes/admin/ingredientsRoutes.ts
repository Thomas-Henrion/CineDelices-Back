import express from 'express';
import ingredientsController from '../../controllers/admin/ingredientsController';

const ingredientsRouter = express.Router();

ingredientsRouter.get('/', ingredientsController.getAllIngredients);

export default ingredientsRouter;