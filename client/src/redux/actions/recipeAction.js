import axios from "axios";
const URL = "http://localhost:8000/recipes"

const GET_ALL = "@GET/recipeAll"
const GET_BY_ID = "@GET/recipeById"
const POST = "@POST/recipe"
const PUT_BY_ID = "@PUT/recipeById"
const DELETE_BY_ID = "@DELETE/recipeById"

const getAllRecipes = () => async (dispatch) =>  {
    try {
        const { data } = await axios( URL )
        return data.data ? dispatch( { type: GET_ALL, payload: data.data } ) : data   
    } catch (error) {
        console.log(error)
    }
}

const getRecipe = ( id ) => async ( dispatch ) => {
    try {
        const { data } = await axios( `${ URL }/${ id }` )
        return data.data ? dispatch( { type: GET_BY_ID, payload: data.data } ) : data   
    } catch (error) {
        console.log(error)
    }
}

const createRecipe = ( recipe ) => async ( dispatch ) => {
    try {
        const { data } = await axios.post( URL, recipe )
        return data.data ? dispatch({ type: POST, payload: data.data }) : data
    } catch (error) {
        console.log(error)
    }
}
const updateRecipe = ( recipe ) => async ( dispatch ) => {
    try {
        const { data } = await axios.put( `${ URL }/${ recipe.id }`, recipe )
        return data.data ? dispatch({ type: PUT_BY_ID, payload: data.data }) : data
    } catch (error) {
        console.log(error)
    }
}
const deleteRecipe = ( id ) => async ( dispatch ) => {
    try {
        const { data } = await axios.delete( `${ URL }/${ id }`)
        return data.data ? dispatch({ type: DELETE_BY_ID, payload: data.data.id }) : data
    } catch (error) {
        console.log(error)
    }
}

export {
    getAllRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    GET_ALL,
    GET_BY_ID,
    POST,
    PUT_BY_ID,
    DELETE_BY_ID
}