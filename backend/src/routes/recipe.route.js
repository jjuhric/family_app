import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipe.controller.js';

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.post('/', protectRoute, createRecipe);
router.put('/:id', protectRoute, updateRecipe);
router.delete('/:id', protectRoute, deleteRecipe);

export default router;
