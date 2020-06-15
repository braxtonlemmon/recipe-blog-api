import { Router } from 'express';
import recipeController from '../controllers/recipeController';
// import passport from 'passport';

const router = Router();

router.get('/', recipeController.indexRecipes);
router.get("/published", recipeController.indexPublishedRecipes);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.destroyRecipe);
router.get('/:id', recipeController.showRecipe);


// router.post(
//   "/recipes",
//   passport.authenticate("jwt", { session: false }),
//   recipeController.createRecipe
// );
// router.put(
//   "/recipes/:id",
//   passport.authenticate("jwt", { session: false }),
//   recipeController.updateRecipe
// );
// router.delete(
//   "/recipes/:id",
//   passport.authenticate("jwt", { session: false }),
//   recipeController.destroyRecipe
// );



export default router;