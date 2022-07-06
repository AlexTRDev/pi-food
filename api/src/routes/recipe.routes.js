//router de express y finciones del modelo
const { Router } = require('express');
const { 
    getAllRecipesBD,
    getAllRecipes,
    getRecipeById,
    createRecipe, 
    createRecipesBulk,
    updateRecipe, 
    deleteRecipe,
} = require('../controllers/recipeController');

// rutas
const router = Router();

router.get( "/", getAllRecipes )
router.get( "/:id", getRecipeById )
router.get( "", getAllRecipesBD )
router.post( "/", createRecipe );
router.post( "/bulk", createRecipesBulk );
router.put( "/:id", updateRecipe );
router.delete( "/:id", deleteRecipe );

//exportaciones
module.exports = router;