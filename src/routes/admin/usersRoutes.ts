import express from 'express';
import usersController from '../../controllers/admin/usersController';

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/create', usersController.createForm);
usersRouter.post('/create', usersController.createUser);
usersRouter.get('/update/:id', usersController.updateForm);
usersRouter.post('/update/:id', usersController.updateUser);
usersRouter.post('/delete/:id', usersController.deleteUser);



export default usersRouter;