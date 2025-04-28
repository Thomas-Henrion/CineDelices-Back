import express from 'express';
import catagoriescontroller from '../../controllers/admin/categoriesController';
import { isAdmin} from '../../middlewares/adminAuthor';

const categoriesRouter = express.Router();

categoriesRouter.get('/',isAdmin, catagoriescontroller.getAllCategories);
categoriesRouter.get('/create',isAdmin, catagoriescontroller.createForm);
categoriesRouter.post('/create',isAdmin, catagoriescontroller.createCategory);
categoriesRouter.post('/delete/:id',isAdmin, catagoriescontroller.deleteCategory);

export default categoriesRouter;