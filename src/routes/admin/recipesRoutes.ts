import express from 'express';
import recipesController from '../../controllers/admin/recipesController';

const recipesRouter = express.Router();

recipesRouter.get('/', recipesController.getAllRecipes);
recipesRouter.get('/validate/:id', recipesController.validateRecipeById);

export default recipesRouter

