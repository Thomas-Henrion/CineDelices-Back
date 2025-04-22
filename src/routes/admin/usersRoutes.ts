import express from 'express';
import usersController from '../../controllers/admin/usersController';

const usersRouter = exprress.Router();

usersRouter.get('/', usersController.getAllUsers);

export default usersRouter;