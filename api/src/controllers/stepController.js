// import model
const { Step } = require("../db")

//funciones de controlador
const getAllSteps = async ( req, res, next ) => {
    try {
        const steps = await Step.findAll()
        steps.length ? res.status(200).json({steps}) : res.status(404).json( { msg: "No data, add data to display!!" } )
    } catch (error) {
        next(error)
    }
}

const getStep = async ( req, res, next ) => {
    const { id } = req.params
    try {
        const step = await Step.findByPk( id )
        step ? res.status(200).json({ step }) : res.status(404).json({ msg: "Step not found!!" })
    } catch (error) {
        next(error)
    }
}

const createStep = async ( req, res, next ) => {
    const { body } = req
    try {
        const step = await Step.create(body)
        if ( step ) res.status(201).json({step, msg: "Sucessfull created Step!!" })
    } catch (error) {
        next(error)
    }
}

const createStepBulk = async ( req, res, next ) => {
    const { body } = req
    try {
        const steps = await Step.bulkCreate(body)
        if( steps.length ) res.status(201).json({steps, msg: "Sucessfull created a list of steps" })
    } catch (error) {
        next(error)
    }
}

const updateStep = async ( req, res, next ) => {
    const { id } = req.params
    const { body } = req
    try {
        const step = await Step.update({ ...body }, { where:{ id } })
        step[0] ? res.status(200).json({ msg: "Successfull updated Step!!" }) : res.status(404).json({ msg: "Step not found!!" })
    } catch (error) {
        next(error)
    }
}

const deleteStep = async ( req, res, next ) => {
    const { id } = req.params
    try {
        const step = await Step.destroy({ where: { id } })
        step ? res.status(200).json({step, msg: "Successfull deleted Step!!" }) : res.status(404).json({ msg: "Step not found!!" })
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