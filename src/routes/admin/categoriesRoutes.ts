import express from 'express';
import catagoriescontroller from '../../controllers/admin/catagoriesController';

const categoriesRouter = express.Router();

categoriesRouter.get('/', catagoriescontroller.getAllCategories);

export default categoriesRouter;