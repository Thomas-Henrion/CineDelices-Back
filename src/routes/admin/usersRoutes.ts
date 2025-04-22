import express from 'express';
import usersController from '../../controllers/admin/usersController';

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);

export default usersRouter;