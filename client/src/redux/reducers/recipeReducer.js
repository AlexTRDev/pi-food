import {
    GET_ALL,
    GET_BY_ID,
    POST,
    PUT_BY_ID,
    DELETE_BY_ID
} from '../actions/recipeAction'

const initialState = {
    recipes: [],
    recipesBD: [],
    recipe: {},
}


const RECIPE_REDUCER = {}

RECIPE_REDUCER[GET_ALL] = (state, payload) => ({ ...state, recipes: payload })
RECIPE_REDUCER[GET_BY_ID] = (state, payload) => ({ ...state, recipe: payload })
RECIPE_REDUCER[POST] = (state, payload) => ({ ...state, recipes: [...state.recipes, payload] })
RECIPE_REDUCER[PUT_BY_ID] = (state, payload) => ({ ...state, recipes: [...state.recipes.filter(recipe => recipe.id !== payload.id), payload] })
RECIPE_REDUCER[DELETE_BY_ID] = (state, payload) => ({ ...state, recipes: [...state.recipes.filter(recipe => recipe.id !== payload.id)] })

const recipeReducer = (state = initialState, { type, payload }) => {
    return RECIPE_REDUCER[type] ? RECIPE_REDUCER[type](state, payload) : state
}

export {
    recipeReducer
}