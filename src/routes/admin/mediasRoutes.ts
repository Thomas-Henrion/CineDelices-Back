import express from 'express';
import mediasController from '../../controllers/admin/mediasController';
import { isAdmin} from '../../middlewares/adminAuthor';

const mediasRouter = express.Router();

mediasRouter.get('/',isAdmin, mediasController.getAllMedias);

// Route to create a new media
mediasRouter.get('/create',isAdmin, mediasController.createForm);
mediasRouter.post('/create',isAdmin, mediasController.createMedia);

mediasRouter.get('/:id',isAdmin, mediasController.getMediaById);


// Route to update a media
mediasRouter.get('/update/:id', isAdmin,mediasController.updateForm);
mediasRouter.post('/update/:id', isAdmin,mediasController.updateMedia);

// route to delete a media
mediasRouter.post('/delete/:id', isAdmin,mediasController.deleteMedia);


export default mediasRouter;