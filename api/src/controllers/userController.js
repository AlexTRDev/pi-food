const { User } = require('../db');

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

const createUser = async (req, res, next) => {
    const { name, lastName, email, password } = req.body;  //Posteriores verificaiones de seguridad
    try {
        if ( name && lastName && email && password ) {
            await User.create( {...req.body} );
            res.status( 201 ).json( {msg: "User created successfully!!"} );
        }else{
            res.status(400).json( { msg: "Bad Request!!" } )
        }
    } catch ( error ) {
        next( error );
    }
}

const createUsersBulk = async (req, res, next) => {
    const body = req.body;  //Posteriores verificaiones de seguridad
    try {
        await User.bulkCreate( body );
        res.status( 201 ).json( {msg: "Users created successfully!!"} );
    } catch ( error ) {
        next( error );
    }
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
            const user = await User.destroy( { where: { id } } );
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