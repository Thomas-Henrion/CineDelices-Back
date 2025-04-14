import express from 'express';
import authRoutes from './authRoutes';
// import adminRoutes from './adminRoutes';
// import recipesRoutes from './recipesRoutes';
// import mediaRoutes from './mediaRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
// router.use('/admin', adminRoutes);
// router.use('/recipes', recipesRoutes);
// router.use('/media', mediaRoutes);

export default router;