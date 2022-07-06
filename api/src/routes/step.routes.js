//import router de express
const { Router } = require('express');

// import funciones del controllador
const {
    getAllSteps,
    getStep,
    createStep,
    updateStep,
    deleteStep,
    createStepBulk
} = require("../controllers/stepController")

// rutas
const router = Router()

router.get( "/", getAllSteps );
router.get( "/:id", getStep );
router.post( "/", createStep );
router.post( "/bulk", createStepBulk );
router.put( "/:id", updateStep );
router.delete( "/:id", deleteStep );

// exportar rutas
module.exports = router;