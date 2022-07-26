import {
    GET_ALL,
    GET_BY_ID,
    POST,
    PUT_BY_ID,
    DELETE_BY_ID
} from '../actions/dietAction'

const initialState = {
    diets: [],
    diet: {},
}


const DIET_REDUCER = {}

DIET_REDUCER[GET_ALL] = (state, payload) => ({ ...state, diets: payload })
DIET_REDUCER[GET_BY_ID] = (state, payload) => ({ ...state, diet: payload })
DIET_REDUCER[POST] = (state, payload) => ({ ...state, diets: [...state.diets, payload] })
DIET_REDUCER[PUT_BY_ID] = (state, payload) => ({ ...state, diets: [...state.diets.filter(diet => diet.id !== payload), payload] })
DIET_REDUCER[DELETE_BY_ID] = (state, payload) => ({ ...state, diets: [...state.diets.filter(diet => diet.id !== payload)] })

const dietReducer = (state = initialState, { type, payload }) => {
    return DIET_REDUCER[type] ? DIET_REDUCER[type](state, payload) : state
}

export {
    dietReducer
}