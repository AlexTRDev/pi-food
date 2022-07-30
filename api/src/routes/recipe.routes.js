//router de express y finciones del modelo
const { Router } = require('express');
const { 
    getAllRecipes,
    getRecipeById,
    createRecipe, 
    createRecipesBulk,
    updateRecipe, 
    deleteRecipe,
    getAllRecipesBD
} = require('../controllers/recipeController');

// rutas
const router = Router();
router.get( "/", getAllRecipesBD )

// router.get( "/", getAllRecipes )
router.get( "/:id", getRecipeById )
router.post( "/", createRecipe );
router.post( "/bulk", createRecipesBulk );
router.put( "/:id", updateRecipe );
router.delete( "/:id", deleteRecipe );

//exportaciones
module.exports = router;