// import model
const axios = require("axios")
const { Diet } = require("../db")
const {
    API_URL, API_URL1, API_URL2, FLAG_URL
  } = process.env;
//funciones de controlador
const getAllDiet = async ( req, res, next ) => {
    try {
        const diets = await Diet.findAll()
        diets.length ? res.status(200).json({diets}) : res.status(404).json( { msg: "No data, add data to display!!" } )
    } catch (error) {
        next(error)
    }
}

const getDiet = async ( req, res, next ) => {
    const { id } = req.params
    try {
        const diet = await Diet.findByPk( id )
        diet ? res.status(200).json(diet) : res.status(404).json({ msg: "Diet not found!!" })
    } catch (error) {
        next(error)
    }
}

const createDiet = async ( req, res, next ) => {
    const { body } = req
    try {
        const diet = await Diet.create(body)
        if ( diet ) res.status(201).json({diet, msg: "Sucessfull created diet!!" })
    } catch (error) {
        next(error)
    }
}

const updateDiet = async ( req, res, next ) => {
    const { id } = req.params
    const { body } = req
    try {
        const diet = await Diet.update({ ...body }, { where:{ id } })
        diet[0] ? res.status(200).json({diet, msg: "Successfull updated diet!!" }) : res.status(404).json({ msg: "Diet not found!!" })
    } catch (error) {
        next(error)
    }
}

const createDietBulk = async ( req, res, next ) => {
    const { body } = req
    try {
        const diets = await Diet.bulkCreate(body)
        if( diets.length ) res.status(201).json({ diets, msg: "Sucessfull created a list of diets" })
    } catch (error) {
        next(error)
    }
}

const deleteDiet = async ( req, res, next ) => {
    const { id } = req.params
    try {
        const diet = await Diet.destroy({ where: { id } })
        diet ? res.status(200).json({ diet, msg: "Successfull deleted diet!!" }) : res.status(404).json({ msg: "Diet not found!!" })
    } catch (error) {
        next(error)
    }
}

// exports funciones de controlador
module.exports = {
    getAllDiet,
    getDiet,
    createDiet,
    updateDiet,
    deleteDiet,
    createDietBulk
}