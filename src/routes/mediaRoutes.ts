import express from 'express';
import mediaController from '../controllers/mediaController';

const router = express.Router();

router.get('/', mediaController.getAllMedia);
router.get('/:id', mediaController.getMediaById);
router.get('/:id/recipes', mediaController.getMediaRecipes);

export default router;