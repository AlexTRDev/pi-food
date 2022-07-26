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
        const data = await Recipe.findAll({
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
        data.length ? res.status(200).json({data}) : res.status(404).json( { msg: "No data, add data to display!!" } )
    } catch (error) {
        next(error)
    }
}

const getAllRecipes = async ( req, res, next ) => {
    const { name } = req.query;
    try {
        let data

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
                diets: element.diets?.map( (diet) => {return {["name"]: diet}}),
                steps: element.analyzedInstructions[0]?.steps.map( (step) => { return {["name"] : step.step} } ),
            }
        })
        
        data = [ ...dataAPI, ...dataDB ]

        if ( name ) {
            data = data.filter( element => element.title.toUpperCase().includes(name.toUpperCase()))
        }
        data.length ? res.status(200).json({ data }) : res.status(404).json({ msg: "Recipe not found!!" })
        
    } catch (error) {
        next(error)
    }
}

const getRecipeById = async ( req, res, next ) => {
    const { id } = req.params
    try {
        if ( !id ) res.status(400).json( { msg: "Bad Request!!" } )
        let data
        if ( Number( id ) ){
            data = await axios( `${ API_URL1 }/${ id }/${ FLAG_URL }` );
        } else{
            data = await Recipe.findByPk( id )
        }
        data ? res.status(200).json({data}) : res.status(404).json( { msg: "Recipe not found!!" } )
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
        readyInMinutes
    } = req.body

    try {
        let data
        if ( !title || !summary ) return res.status(400).json( { msg: "Bad Request!!" } )
        data = await Recipe.create({ title, summary, healthScore, image, readyInMinutes })
        // add{nombre de la tabla} => agrega datos a la tabla intermedia
        if ( diets ) { await data.addDiet(diets)}
        if ( steps ) { 
            const pasos = await Step.bulkCreate(steps)
            data.addStep(pasos)
        }
        if ( data ) res.status(201).json({data: data, msg: "Recipe created successfully!!" })
    } catch (error) {
        next(error)
    }
}

const createRecipesBulk = async (req, res, next) => {
    const body = req.body
    try {
        const data = await Recipe.bulkCreate(body)
        // if ( diets ) data.addDiet(diets)
        // if ( steps ) data.addStep(steps)
        if ( data.length ) res.status(201).json({data, msg: "Recipes created successfully!!" })
    } catch (error) {
        next(error)
    }
}

const updateRecipe = async (req, res, next) => {

    const { id } = req.params;
    const body = req.body;
    try {
        const data = await Recipe.update( {...body}, {where: { id }} );
        data ? res.status(200).json({data, msg: "Recipe updated successfully!!" }) : res.status(404).json({ msg: "Recipe not found!!" })
    } catch (error) {
        next(error);
    }
}

const deleteRecipe = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await Recipe.destroy( {where: {id}} );
        data ? res.status(200).json({data, msg: "Recipe deleted successfully!!" }) : res.status(404).json({ msg: "Recipe not found!!" })
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