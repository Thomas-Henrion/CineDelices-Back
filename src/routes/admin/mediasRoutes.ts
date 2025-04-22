import express from 'express';
import mediasController from '../../controllers/admin/mediasController';

const mediasRouter = express.Router();

mediasRouter.get('/', mediasController.getAllMedias);


export default mediasRouter;