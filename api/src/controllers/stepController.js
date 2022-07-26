// import model
const { Step } = require("../db")

//funciones de controlador
const getAllSteps = async ( req, res, next ) => {
    try {
        const data = await Step.findAll()
        console.log(data)
        data.length ? res.status(200).json(data) : res.status(404).json( { msg: "No data, add data to display!!" } )
    } catch (error) {
        next(error)
    }
}

const getStep = async ( req, res, next ) => {
    const { id } = req.params
    try {
        const data = await Step.findByPk( id )
        data ? res.status(200).json(data) : res.status(404).json({ msg: "Step not found!!" })
    } catch (error) {
        next(error)
    }
}

const createStep = async ( req, res, next ) => {
    const { body } = req
    try {
        const data = await Step.create({...body })
        if ( data ) res.status(201).json({ msg: "Sucessfull created Step!!" })
    } catch (error) {
        next(error)
    }
}

const createStepBulk = async ( req, res, next ) => {
    const { body } = req
    try {
        const data = await Step.bulkCreate(body)
        if( data.length ) res.status(201).json({data, msg: "Sucessfull created a list of steps" })
    } catch (error) {
        next(error)
    }
}

const updateStep = async ( req, res, next ) => {
    const { id } = req.params
    const { body } = req
    try {
        const data = await Step.update({ ...body }, { where:{ id } })
        data[0] ? res.status(200).json({ msg: "Successfull updated Step!!" }) : res.status(404).json({ msg: "Step not found!!" })
    } catch (error) {
        next(error)
    }
}

const deleteStep = async ( req, res, next ) => {
    const { id } = req.params
    try {
        const data = await Step.destroy({ where: { id } })
        data ? res.status(200).json({ msg: "Successfull deleted Step!!" }) : res.status(404).json({ msg: "Step not found!!" })
    } catch (error) {
        next(error)
    }
}

// exports funciones de controlador
module.exports = {
    getAllSteps,
    getStep,
    createStep,
    updateStep,
    deleteStep,
    createStepBulk
}