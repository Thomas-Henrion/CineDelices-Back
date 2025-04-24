import express from 'express';
import recipesController from '../../controllers/admin/recipesController';

const recipesRouter = express.Router();

recipesRouter.get('/', recipesController.getAllRecipes);

// Route to validate a new recipe
recipesRouter.get('/validate/:id', recipesController.validateRecipesById);
recipesRouter.post('/validate/:id', recipesController.validateRecipesById);

// Route to delete a recipe
recipesRouter.post('/delete/:id', recipesController.deleteRecipeById);

export default recipesRouter

