import express from 'express';
import recipesController from '../../controllers/admin/recipesController';
import { isAdmin} from '../../middlewares/adminAuthor';

const recipesRouter = express.Router();

recipesRouter.get('/',isAdmin, recipesController.getAllRecipes);
recipesRouter.get('/validate/:id',isAdmin, recipesController.validateRecipesById);
recipesRouter.post('/delete/:id',isAdmin, recipesController.deleteRecipeById);

export default recipesRouter

