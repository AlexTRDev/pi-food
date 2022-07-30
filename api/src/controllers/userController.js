const { User, Diet, Recipe, Step } = require('../db');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        if ( id ) {
            const user = await User.findByPk( id );
            user ? res.status( 200 ).json( user ) : res.status(404).json("User Not Found");
        }else{
            res.status(400).json( { msg: "Bad Request!!" } )
        }
    } catch ( error ) {
        next( error );
    }
}

const createUser = async (req, res, next) => {}

const createUsersBulk = async (req, res, next) => {
    const { user, recipes, diets, pasos, diets_recipes } = req.body;
    try {
        if ( !user ) return res.status(400).json( { msg: "Bad Request!!" } );
        if ( !recipes ) return res.status(400).json( { msg: "Bad Request!!" } );
        if ( !diets ) return res.status(400).json( { msg: "Bad Request!!" } );
        
        const userDB = await User.create( user );
        if ( userDB ) {
            const dietas = await Diet.bulkCreate( diets );
            const recetas = await Recipe.bulkCreate( recipes );
            userDB.addDiets( dietas );
            userDB.addRecipe( recetas );

            if ( pasos ) {
                console.log("entra a los pasos")
                pasos.forEach( async ( receta ) => {
                    const recetaBD = await Recipe.findByPk(receta.id)
                    if ( receta?.steps?.length ) {
                        const pasos = await Step.bulkCreate(receta.steps);
                        recetaBD.addStep(pasos);
                    }
                })
            }

            if ( diets_recipes ) {
                console.log("entra a las diets")
                diets_recipes.forEach( async (receta) => {
                    const recetaBD = await Recipe.findByPk(receta.id)
                    if ( receta?.diets?.length ) {
                    recetaBD.addDiets(receta.diets);
                }})
            }
            res.status(201).json( {userDB, dietas, recetas,  msg: "User created successfully!!" } );
        }
    } catch (error) {
        next(error);
    }

    // const { name, lastName, email, password } = req.body;  //Posteriores verificaiones de seguridad
    // try {
    //     if ( name && lastName && email && password ) {
    //         await User.create( {...req.body} );
    //         res.status( 201 ).json( {msg: "User created successfully!!"} );
    //     }else{
    //         res.status(400).json( { msg: "Bad Request!!" } )
    //     }
    // } catch ( error ) {
    //     next( error );
    // }
}

const updateUser = async (req, res, next) => {
    const body = req.body; //Posteriores verificaiones de seguridad
    const { id } = req.params;
    try {

        if ( id ){
            const user = await User.update( {...body}, { where: { id } } );
            user[0] ? res.status( 200 ).json( {msg: "User updated successfully!!"} ) : res.status(404).json("User Not Found");
        }else{
            res.status(400).json( { msg: "Bad Request!!" } )
        }
    } catch ( error ) {
        next( error );
    }
}

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        if ( id ) {
            const user = await User.destroy( { where: { id }} );
            user ? res.status( 200 ).json( {msg: "User deleted successfully!!"} ) : res.status(404).json("User Not Found");
        }else{
            res.status(400).json( { msg: "Bad Request!!" } )
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    createUsersBulk
}