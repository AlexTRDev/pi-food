import { Routes, Route } from "react-router-dom"
import App from "../app/App"
import HomePage from "pages/home/HomePage"
import RecipesPage from "pages/recipes/RecipesPage"
import CreateRecipeComponent from "components/recipes/CreateRecipeComponent"
import DetailRecipeComponent from "components/recipes/DetailRecipeComponent"
import Contador from "components/contador/Contador"

function RoutesApp () {
    return (
        <Routes>
            <Route path="/" element= { <App /> }> 
                <Route index element={ <HomePage /> } />
            </Route>
            <Route path="recetas" element={ <RecipesPage /> } /> 
            <Route path="recetas/crear" element={ <CreateRecipeComponent /> } />
            <Route path="recetas/detalle/:id" element={ <DetailRecipeComponent /> } />
            <Route path="contador" element={ <Contador /> } />
        </Routes>
    )
}

export default RoutesApp