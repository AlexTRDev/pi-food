// import model
const { Diet } = require("../db")

//funciones de controlador
const getAllDiet = async ( req, res, next ) => {
    try {
        const data = await Diet.findAll()
        data.length ? res.status(200).json(data) : res.status(404).json( { msg: "No data, add data to display!!" } )
    } catch (error) {
        next(error)
    }
}

const getDiet = async ( req, res, next ) => {
    const { id } = req.params
    try {
        const data = await Diet.findByPk( id )
        data ? res.status(200).json(data) : res.status(404).json({ msg: "Diet not found!!" })
    } catch (error) {
        next(error)
    }
}

const createDiet = async ( req, res, next ) => {
    const { body } = req
    try {
        const data = await Diet.create({...body })
        if ( data ) res.status(201).json({ msg: "Sucessfull created diet!!" })
    } catch (error) {
        next(error)
    }
}

const updateDiet = async ( req, res, next ) => {
    const { id } = req.params
    const { body } = req
    try {
        const data = await Diet.update({ ...body }, { where:{ id } })
        data[0] ? res.status(200).json({ msg: "Successfull updated diet!!" }) : res.status(404).json({ msg: "Diet not found!!" })
    } catch (error) {
        next(error)
    }
}

const createDietBulk = async ( req, res, next ) => {
    const { body } = req
    try {
        const data = await Diet.bulkCreate(body)
        if( data.length ) res.status(201).json({ msg: "Sucessfull created a list of diets" })
    } catch (error) {
        next(error)
    }
}

const deleteDiet = async ( req, res, next ) => {
    const { id } = req.params
    try {
        const data = await Diet.destroy({ where: { id } })
        data ? res.status(200).json({ msg: "Successfull deleted diet!!" }) : res.status(404).json({ msg: "Diet not found!!" })
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