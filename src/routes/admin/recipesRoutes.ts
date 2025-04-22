import express from 'express';
import recipesController from '../../controllers/admin/recipesController';

const recipesRouter = express.Router();

recipesRouter.get('/', recipesController.getAllRecipes);

export default recipesRouter

