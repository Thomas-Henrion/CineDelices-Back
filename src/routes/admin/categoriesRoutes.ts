import express from 'express';
import catagoriescontroller from '../../controllers/admin/categoriesController';

const categoriesRouter = express.Router();

categoriesRouter.get('/', catagoriescontroller.getAllCategories);
categoriesRouter.get('/create', catagoriescontroller.createForm);
categoriesRouter.post('/create', catagoriescontroller.createCategory);

export default categoriesRouter;