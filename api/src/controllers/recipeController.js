require('dotenv').config();
const { Recipe, Diet, Step} = require("../db")
const axios = require('axios');
const {
    API_URL, API_URL1, API_URL2, FLAG_URL
  } = process.env;

// API_URL2=https://api.spoonacular.com/recipes/complexSearch?apiKey=4ac67de829494b7195a6cd464ea7be57&addRecipeInformation=true&number=100
// API_URL=https://api.spoonacular.com/recipes/complexSearch?apiKey=206aac4c607943c49eb99bf20a699dad&addRecipeInformation=true&number=100

const getAllRecipesBD = async ( req, res, next ) => {
    try {
        const recipes = await Recipe.findAll({
            include: [
                {
                    model: Diet,
                },
                {
                    model: Step,
                }
            ],
            order: [ ["id", "ASC"] ]
        })
        recipes.length ? res.status(200).json({recipes}) : res.status(404).json( { msg: "No data, add data to display!!" } )
    } catch (error) {
        next(error)
    }
}

const getAllRecipes = async ( req, res, next ) => {
    const { name } = req.query;
    try {
        let recipes
        let dataDB = await Recipe.findAll({
            include: [
                {
                    model: Diet,
                },
                {
                    model: Step,
                }
            ],
            order: [ ["id", "ASC"] ]
        })

        let { data: { results: dataAPI } } = await axios( `${ API_URL }` );

        dataAPI = dataAPI.map( element => {
            return {
                id: element.id,
                title: element.title,
                summary: element.summary,
                healthScore: element.healthScore,
                image: element.image,
                readyInMinutes: element.readyInMinutes,
                steps: element.analyzedInstructions[0]?.steps.map( (step) => { return {["name"] : step.step} } ),
                diets: element.diets?.map( (diet) => {return {["name"]: diet}}),
                userId: 1
            }
        })
        
        recipes = [ ...dataAPI, ...dataDB ]

        if ( name ) {
            recipes = recipes.filter( element => element.title.toUpperCase().includes(name.toUpperCase()))
        }
        recipes.length ? res.status(200).json({ recipes }) : res.status(404).json({ msg: "Recipe not found!!" })
        
    } catch (error) {
        next(error)
    }
}

const getRecipeById = async ( req, res, next ) => {
    const { id } = req.params
    try {
        if ( !id ) return res.status(400).json( { msg: "Bad Request!!" } ) 
        let recipe
        if ( Number( id ) ){
            recipe = await axios( `${ API_URL1 }/${ id }/${ FLAG_URL }` );
        } else{
            recipe = await Recipe.findByPk( id )
        }
        recipe ? res.status(200).json({recipe}) : res.status(404).json( { msg: "Recipe not found!!" } )
    } catch (error) {
        next(error)
    }
}

const createRecipe = async (req, res, next) => {
    const {     
        title,
        summary,
        healthScore,
        image,
        steps,
        diets,
        readyInMinutes,
        userId
    } = req.body

    try {
        let recipe
        if ( !title || !summary ) return res.status(400).json( { msg: "Bad Request!!" } )
        recipe = await Recipe.create({ title, summary, healthScore, image, readyInMinutes })
        // add{nombre de la tabla} => agrega datos a la tabla intermedia
        if ( diets ) { await recipe.addDiets(diets)}
        if ( steps ) { 
            const pasos = await Step.bulkCreate(steps)
            recipe.addStep(pasos)
        }
        if ( userId ) {
            await recipe.addUser(userId)
        }
        if ( recipe ) res.status(201).json({recipe, msg: "Recipe created successfully!!" })
    } catch (error) {
        next(error)
    }
}

const createRecipesBulk = async (req, res, next) => {
    const { data } = req.body
    try {
        const recipes = await Recipe.bulkCreate(data)
        if ( userId ) {
            await recipes.addUser(userId)
        }
        if ( recipes.length ) res.status(201).json({recipes, msg: "Recipes created successfully!!" })
    } catch (error) {
        next(error)
    }
}

const updateRecipe = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const recipe = await Recipe.update( {...body}, {where: { id }} );
        recipe ? res.status(200).json({recipe, msg: "Recipe updated successfully!!" }) : res.status(404).json({ msg: "Recipe not found!!" })
    } catch (error) {
        next(error);
    }
}

const deleteRecipe = async (req, res, next) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.destroy( {where: {id}} );
        recipe ? res.status(200).json({recipe, msg: "Recipe deleted successfully!!" }) : res.status(404).json({ msg: "Recipe not found!!" })
    } catch (error) {
        next(error);
    }
}

module.exports = { 
    getAllRecipesBD,
    getAllRecipes,
    getRecipeById,
    createRecipe, 
    createRecipesBulk,
    updateRecipe, 
    deleteRecipe,
};