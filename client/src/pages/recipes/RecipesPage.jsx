import { useEffect } from "react"
import useFilter from "hooks/useFilter2"
import styled from "styled-components"
import { Diamond } from "components/layout/BgDiamondComponent"
import FilterComponent from "components/filter/FilterComponent"
import SearchComponent from "components/search/SearchComponent"
import CardReversibleComponent from "components/cards/CardReversibleComponent"
import PaginateComponent from "components/paginate/PaginateComponent"
import OrderComponent from "components/order/OrderComponent"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button } from "components/sections/HomeComponent"
import { COLORS } from "assets/util/globales"
import { LogoStyled } from "components/recipes/CreateRecipeComponent"
import LogoComponent from "components/logo/LogoComponent"

function RecipesPage() {
   const recipes = useSelector( state => state.recipeStore.recipes )
   const diets = useSelector( state => state.dietStore.diets )
   const {page, search, type, order, alphabetical, healthScore, recipesChange, typeChange, searchChange, orderChange, alphabeticalChange, healthScoreChange, paginateChange, mostrar} = useFilter()

   useEffect(() => {
      healthScoreChange()
   },[])

   useEffect(() => {
      recipesChange(recipes)
      mostrar()
   }, [search, type, order, alphabetical, healthScore, recipes])

   return (
         <>
            <Diamond />
            <LogoStyled>
               <Link to="/">
                  <LogoComponent />
               </Link>
            </LogoStyled>
            <SearchContent>
               <Link to="/recetas/crear">
                  <ButtonCreate primary bgGradient>Crear Receta</ButtonCreate>
               </Link>
               <SearchComponent searchChange={searchChange}/>
               <OrderComponent order={order} alphabetical={alphabetical} healthScore={healthScore} alphabeticalChange={alphabeticalChange} healthScoreChange={healthScoreChange} orderChange={orderChange}/>
            </SearchContent>
            <FilterComponent typeChange={typeChange} diets={diets}/>
            <TypeFilter>
               <label>{type}</label>
            </TypeFilter>
            <ContentRecipes>
            {
               page.data && page.data.map((recipe, index) => ( <CardReversibleComponent key={`${index}${recipe.id}`} {...recipe}/> ))
            }
            </ContentRecipes>

            <PaginateComponent {...page} paginateChange={paginateChange}/>
         </>
   )
}

const TypeFilter = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   label{
      font-size: 1.5rem;
      font-weight: bold;
      color: ${COLORS.SECOND_GREEN};
      text-align: center;
      margin-top: 1rem;
      border-bottom: 3px solid ${COLORS.SECOND_GREEN};
      padding-bottom: 0.5rem;
      text-transform: uppercase;
   }
`

const ButtonCreate = styled(Button)`
   border-radius: 15px;
   &:hover {
      transform: scale(1.05);
   }
`

const ContentRecipes = styled.div`
   width: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: 20px;
`

const SearchContent = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: space-evenly;
   align-items: flex-start;
   align-content: center;
   padding: 20px;
   button {
      margin: 0 20px;
   }
   a{
      margin: 10px 0;
   }
`

export default RecipesPage