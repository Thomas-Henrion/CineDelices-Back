import express from 'express';
import usersController from '../../controllers/admin/usersController';
import { isAdmin } from '../../middlewares/adminAuthor';


const usersRouter = express.Router();

usersRouter.get('/',isAdmin, usersController.getAllUsers);
usersRouter.get('/create', isAdmin,usersController.createForm);
usersRouter.post('/create',isAdmin,usersController.createUser);
usersRouter.get('/update/:id', isAdmin,usersController.updateForm);
usersRouter.post('/update/:id',isAdmin, usersController.updateUser);
usersRouter.post('/delete/:id',isAdmin, usersController.deleteUser);



export default usersRouter;