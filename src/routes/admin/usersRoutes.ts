import express from 'express';
import usersController from '../../controllers/admin/usersController';

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/create', usersController.createForm);
usersRouter.post('/create', usersController.CreateUser);



export default usersRouter;