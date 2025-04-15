import express from "express";
import categoryController from "../controllers/admin/categoryController";
import { createCategorySchema, updateCategorySchema } from "../validators/categoryValidator";
import { createValidator, type ExpressJoiConfig } from "express-joi-validation";

const router = express.Router();

// Route for Admin dashboard
// router.get("/dashboard", .getAdminPage);
 //// Route for Admin user management
// router.get("/dashboardn/users", .getUsers);
// router.get("/dashboard/users/:id", .getUserById);
// router.patch("/dashboard/users", .updateUser);
// router.delete("/dashboard/users", .deleteUser);
 ////route for admin recipes management
// router.get("/dashboard/recipes", .getRecipes);
// router.get("/dashboard/recipes/:id", .getRecipeById);
// router.patch("/dashboard/recipes", .updateRecipe);
// router.delete("/dashboard/recipes", .deleteRecipe);
// Route for Admin categories management
router.post(
    "/dashboard/categories",
    createValidator({ passError: true}).body(createCategorySchema),
    categoryController.createCategory);
router.get("/dashboard/categories",categoryController.getAllCategories);
router.delete("/dashboard/categories/:id", categoryController.deleteCategory);
router.get("/dashboard/categories/:id", categoryController.getCategoryById);
router.patch("/dashboard/categories/:id",
    createValidator({ passError: true}).body(updateCategorySchema),
    categoryController.updateCategory);
//// Route for Admin ingredients management
// router.get("/dashboard/ingredients", .getIngredients);
// router.get("/dashboard/ingredients/:id", .getIngredientById);
// router.post("/dashboard/ingredients", .createIngredient);
// router.patch("/dashboard/ingredients", .updateIngredient);
// router.delete("/dashboard/ingredients", .deleteIngredient);

export default router;
