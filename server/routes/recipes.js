import { Router } from 'express';
import recipeController from '../controllers/recipeController';
import passport from 'passport';

const router = Router();

router.get('/', recipeController.indexRecipes);
router.get("/published", recipeController.indexPublishedRecipes);
router.post(
  "/recipes",
  passport.authenticate("jwt", { session: false }),
  recipeController.createRecipe
);
router.put(
  "/recipes/:id",
  passport.authenticate("jwt", { session: false }),
  recipeController.updateRecipe
);
router.delete(
  "/recipes/:id",
  passport.authenticate("jwt", { session: false }),
  recipeController.destroyRecipe
);

router.get('/:id', recipeController.showRecipe);

export default router;