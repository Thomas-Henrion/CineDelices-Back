import express from 'express';
import adminController from '../controllers/adminController.mjs';

const router = express.Router();
// Route for Admin dashboard
router.get('/dashboard', adminController.getAdminPage);
// Route for Admin user management
router.get('/dashboardn/users', adminController.getUsers);
router.get('/dashboard/users/:id', adminController.getUserById);
router.patch('/dashboard/users', adminController.updateUser);
router.delete('/dashboard/users', adminController.deleteUser);
//route for admin recipes management
router.get('/dashboard/recipes', adminController.getRecipes);
router.get('/dashboard/recipes/:id', adminController.getRecipeById);
router.patch('/dashboard/recipes', adminController.updateRecipe);
router.delete('/dashboard/recipes', adminController.deleteRecipe);
// Route for Admin categories management
router.get('/dashboard/categories', adminController.getCategories);
router.get('/dashboard/categories/:id', adminController.getCategoryById);
router.post('/dashboard/categories', adminController.createCategory);
router.patch('/dashboard/categories', adminController.updateCategory);
router.delete('/dashboard/categories', adminController.deleteCategory);
// Route for Admin ingredients management
router.get('/dashboard/in;redients', adminController.getIngredients);
router.get('/dashboard/ingredients/:id', adminController.getIngredientById);
router.post('/dashboard/ingredients', adminController.createIngredient);
router.patch('/dashboard/ingredients', adminController.updateIngredient);
router.delete('/dashboard/ingredients', adminController.deleteIngredient);

export default router;