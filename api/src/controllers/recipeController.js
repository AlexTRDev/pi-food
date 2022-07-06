require('dotenv').config();
const { Recipe, Op } = require("../db")
const axios = require('axios');
const {
    API_URL, API_URL1, API_URL2, FLAG_URL
  } = process.env;

const getAllRecipesBD = async ( req, res, next ) => {
    const { dataBase } = req.query;
    try {
        if ( dataBase ) {
            const data = await Recipe.findAll()
            data.length ? res.status(200).json(data) : res.status(404).json( { msg: "No data, add data to display!!" } )
        }
    } catch (error) {
        next(error)
    }
}

const getAllRecipes = async ( req, res, next ) => {
    const { name } = req.query;
    try {
        let allData

        let { data: { results: dataAPI } } = await axios( `${ API_URL }` );
        let dataDB = await Recipe.findAll()
        
        dataAPI = dataAPI.map( element => {
            const { id, title, summary, healthScore, image, steps, diets } = element
            return { id, title, summary, healthScore, image, steps, diets }
        })

        allData = [ ...dataAPI, ...dataDB ]

        if ( name ) {
            allData = allData.filter( element => element.title.toUpperCase().includes(name.toUpperCase()))
        }
        allData.length ? res.status(200).json(allData) : res.status(404).json({ msg: "Recipe not found!!" })
        
    } catch (error) {
        next(error)
    }
}

const getRecipeById = async ( req, res, next ) => {
    let { id } = req.params
    try {
        let data
        if ( !Number(id) ){
            data = await Recipe.findByPk(id)
        } else {
            const dataDB = await axios( `${API_URL1}/${id}/${FLAG_URL}` );
            data = dataDB.data
        }

        data ? res.status(200).json(data) : res.status(404).json( { msg: "Recipe not found!!" } )
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
    } = req.body

    try {
        let data
        if ( !title && !summary ) return res.status(400).json( { msg: "Bad Request!!" } )
        data = await Recipe.create({ title, summary, healthScore, image })
        // add{nombre de la tabla} => agrega datos a la tabla intermedia
        if ( diets ) data.addDiet(diets)
        if ( steps ) data.addStep(steps)
        if ( data ) res.status(201).json({ msg: "Recipe created successfully!!" })
    } catch (error) {
        next(error)
    }
}

const createRecipesBulk = async (req, res, next) => {
    const { body } = req
    console.log({ body })
    try {
        const data = await Recipe.bulkCreate(body)
        if ( data.length ) res.status(201).json({ msg: "Recipes created successfully!!" })
    } catch (error) {
        next(error)
    }
}

const updateRecipe = async (req, res, next) => {

    const { id } = req.params;
    const body = req.body;
    try {
        const recipe = await Recipe.update( {...body}, {where: { id }} );
        recipe ? res.status(200).json({ msg: "Recipe updated successfully!!" }) : res.status(404).json({ msg: "Recipe not found!!" })
    } catch (error) {
        next(error);
    }
}

const deleteRecipe = async (req, res, next) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.destroy( {where: {id}} );
        recipe ? res.status(200).json({ msg: "Recipe deleted successfully!!" }) : res.status(404).json({ msg: "Recipe not found!!" })
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