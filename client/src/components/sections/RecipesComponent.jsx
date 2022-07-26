import styled from "styled-components"
import { GeneralBgStyled, ContainerTexto } from "components/layout/GeneralBgStyled"
import ButtonTemplate from "components/template/ButtonTemplate"
import { COLORS } from "assets/util/globales"
import CardReversibleComponent from "components/cards/CardReversibleComponent"
import receta_1 from "assets/images/receta_1.jpg"
import receta_2 from "assets/images/receta_2.jpg"
import receta_3 from "assets/images/receta_3.jpg"
import { Link } from "react-router-dom"

const recipe1 = {
   id: 1,
   title: "CHICHARRON CON PAPAS",
   image: receta_1,
   diets: [{name:"dairy free"},{name:"fodmap friendly"},{name:"gluten free"}],
   healthScore: 55,
   readyInMinutes: 35
}
const recipe2 = {
   id: 2,
   title: "AJI DE GALLINA",
   image: receta_2,
   diets: [{name:"primal"},{name:"whole 30"},{name:"ketogenic"},{name:"paleolithic"}],
   healthScore: 85,
   readyInMinutes: 40
}
const recipe3 = {
   id: 3,
   title: "CHUPE DE CAMARONES",
   image: receta_3,
   diets: [{name:"paleolithic"},{name:"ketogenic"},{name:"gluten free"},{name:"pescatarian"}],
   healthScore: 65,
   readyInMinutes: 45
}

function RecipesComponent() {
  return (
    <GeneralBgStyled className='scroll-page' id="recipes"primary column>
      <Contenido>
         <h1>Las mejores recetas de <span>Comida Saludable</span></h1>
         <p>Una buena alimentación es un instrumento clave para mejorar nuestra salud y por tanto, nuestra calidad de vida. Pero esto también funciona en el sentido contrario.</p>
      </Contenido>
      <ContainerImagen >
         <CardReversibleComponent {...recipe1}/>
         <CardReversibleComponent {...recipe2}/>
         <CardReversibleComponent {...recipe3}/>
      </ContainerImagen>
      <ContentBotton>
         <Link to="/recetas">
            <Button primary bgGradient>Ver más...</Button>
         </Link>
      </ContentBotton>
    </GeneralBgStyled>
  )
}

const ContentBotton = styled.div`
   width: 80%;
   display: flex;
   justify-content: start;
   padding: 0 50px;
`

const Button = styled(ButtonTemplate)`
   left: 0;
   border: none;
   height: 40px;
   background: ${props => props.bgGradient ? `linear-gradient(to left, ${COLORS.SECOND_GREEN}, ${COLORS.PRIMARY_GREEN})` : ""};

   ${props => props.radio ? "border-radius: 20px; background:black; color:white" : ""};

   &:hover{
      background: ${COLORS.SECOND};
      color: ${COLORS.PRIMARY_GREEN};
      ${props => props.radio ? "background:white; color:black" : ""};
   }  
`

const Contenido = styled(ContainerTexto)`
   width: 70%;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: flex-start;
   margin: 20px auto;
`
const ContainerImagen = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-items: center;
   justify-content: center;
   width: 80%;
   img{
      height: 100%;
   }
   a{
      display: none;
   }
`

export default RecipesComponent