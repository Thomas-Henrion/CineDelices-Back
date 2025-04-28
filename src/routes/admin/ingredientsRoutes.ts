import express from 'express';
import ingredientsController from '../../controllers/admin/ingredientsController';
import { isAdmin } from '../../middlewares/adminAuthor';

const ingredientsRouter = express.Router();

ingredientsRouter.get('/',isAdmin, ingredientsController.getAllIngredients);
ingredientsRouter.post('/delete/:id',isAdmin, ingredientsController.deleteIngredient);
ingredientsRouter.get('/create',isAdmin, ingredientsController.createForm);
ingredientsRouter.post('/create', isAdmin,ingredientsController.createIngredient);



export default ingredientsRouter;