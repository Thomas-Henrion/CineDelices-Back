import express from 'express';
import ingredientsController from '../../controllers/admin/ingredientsController';

const ingredientsRouter = express.Router();

ingredientsRouter.get('/', ingredientsController.getAllIngredients);
ingredientsRouter.post('/delete/:id', ingredientsController.deleteIngredient);
ingredientsRouter.get('/create', ingredientsController.createForm);
ingredientsRouter.post('/create', ingredientsController.createIngredient);



export default ingredientsRouter;