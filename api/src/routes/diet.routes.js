//import router de express
const { Router } = require('express');

// import funciones del controllador
const {
    getAllDiet,
    getDiet,
    createDiet,
    updateDiet,
    deleteDiet,
    createDietBulk
} = require("../controllers/dietController")

// rutas
const router = Router()

router.get( "/", getAllDiet );
router.get( "/:id", getDiet );
router.post( "/", createDiet );
router.post( "/bulk", createDietBulk );
router.put( "/:id", updateDiet );
router.delete( "/:id", deleteDiet );


// exportar rutas
module.exports = router;