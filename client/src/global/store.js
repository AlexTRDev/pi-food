import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { recipeReducer } from "redux/reducers/recipeReducer"
import { dietReducer } from "redux/reducers/dietReducer"


const rootReducer = combineReducers({
    recipeStore:recipeReducer,
    dietStore:dietReducer
})

const store = configureStore({
    reducer: rootReducer
})

export { store }