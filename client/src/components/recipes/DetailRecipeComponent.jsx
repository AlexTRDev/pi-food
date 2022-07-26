import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { icons } from "assets/icons";

function DetailRecipeComponent() {
   const recipes = useSelector(state => state.recipeStore.recipes);
   const params = useParams()
   
   if ( params.id ) {
      const recipe = recipes.find(recipe => recipe.id === Number(params.id));

      return (
         <ContainerDetails>
         {
            recipe && (<>

            <h1>{recipe.title}</h1>
            <Top>
               <ContainerCard>
                  <img src={recipe.image} alt={recipe.title}/>
                  <FooterTop>
                     <span>HealtScore: {recipe.healthScore}</span>
                     {
                        recipe.readyInMinutes ? <span>Preparación: {recipe.readyInMinutes}</span> : <span>Preparación:  No disponible</span>
                     }
                  </FooterTop>
               </ContainerCard>
               <ContainerDiets>
                  <h3>Todas las dietas</h3>
                  {recipe?.diets?.map((diet, index) => (
                  <div key={diet.name}>
                     <img name={diet.name + index} src={icons[diet.name]} alt={diet.name} title={diet.name}/>
                     <span >{index + 1}.- {diet.name}</span>
                  </div>
                  ))}
               </ContainerDiets>
            </Top>

            <Bottom>
               <div>
                  <h3>Descripción de la receta</h3>
                  <p  dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
               </div>

               <div>
                  <h3>Todos los pasos</h3>
                  {recipe?.steps?.map((step, index) => (<p key={step.name + index}><span>Paso Nº {index + 1}:</span> {step.name}</p>))}
               </div>
            </Bottom>
            </>)
         }
         </ContainerDetails>
      )
   } else {
      return (
         <>
            <h1>NOT FOUND</h1>
         </>
      )
   }
}

const Bottom = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   height: 100%;
   width: 100%;
   padding: 20px;
   border-top: 1px solid #ccc; 
   border-bottom: 1px solid #ccc;
   margin-top: 20px;
`

const ContainerDiets = styled.div`
   display: flex;
   flex-direction: column;
   margin: 20px;

   div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      margin: 10px 0;
      padding: 5px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
   }

   img{
      margin-right: 10px;
      width: 20px;
   }

`
const ContainerCard = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   margin: 20px;
   padding: 20px;
   img{
      width: 350px;
      object-fit: cover;
      border-radius: 15px;
      margin: 20px;
      box-shadow: 0px 0px 20px 10px rgba(0,0,0,0.5);

   }

   h1{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
   }

`

const FooterTop = styled.div`
   span {
      margin-right: 10px;
   }
`

const Top = styled.div`
   position: relative;
   width: 70%;
   min-height: 500px;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: center;
   align-items: center;
   align-content: center;
   border: 1px solid rgba(0,0,0,0.1);
`

const ContainerDetails = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   padding: 20px;
   width: 100vw;
   min-height: calc(100vh - 75px);
   background-color: #f5f5f5;
   padding-top: 50px;

   h1{
      font-size: 2.5rem;
      font-weight: bold;
      margin: 5px 0;

   }

   h3{
      font-size: 1.3rem;
      font-weight: bold;
      margin-top: 5px;
   }

   p{
      margin: 5px;
   }

   span{
      font-size: 1rem;
      font-weight: bold;
      margin-right: 10px;
   }
`

export default DetailRecipeComponent