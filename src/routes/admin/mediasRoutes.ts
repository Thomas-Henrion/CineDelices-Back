import express from 'express';
import mediasController from '../../controllers/admin/mediasController';

const mediasRouter = express.Router();

mediasRouter.get('/', mediasController.getAllMedias);

mediasRouter.get('/:id', mediasController.getMediaById);

// Route to create a new media
mediasRouter.get('/create', mediasController.createForm);


// Route to update a media
mediasRouter.get('/update/:id', mediasController.updateForm);
mediasRouter.post('/update/:id', mediasController.updateMedia);

// route to delete a media
mediasRouter.post('/delete/:id', mediasController.deleteMedia);


export default mediasRouter;