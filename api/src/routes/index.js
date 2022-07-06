const { Router } = require('express');
const recipeRouter = require("./recipe.routes");
const userRouter = require("./user.routes");
const dietRouter = require("./diet.routes")
const stepRouter = require("./step.routes")
 // Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use( "/recipes",  recipeRouter )
router.use( "/users", userRouter )
router.use( "/diets", dietRouter )
router.use( "/steps", stepRouter )

module.exports = router;
