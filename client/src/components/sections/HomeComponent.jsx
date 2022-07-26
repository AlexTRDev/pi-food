import { COLORS } from 'assets/util/globales'
import ButtonTemplate from 'components/template/ButtonTemplate'
import { GeneralBgStyled, ContainerTexto } from 'components/layout/GeneralBgStyled'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import peruvian_food from "assets/images/peruvian_food.jpg"

function HomeComponent () {
   return (
      <GeneralBgStyled className='scroll-page' id='home' >
            <ContainerTexto >
               <h1>Somos expertos en la <br /><span>recomendación de Comida Saludable</span></h1>
               <p>Una buena alimentación es un instrumento clave para mejorar nuestra salud y por tanto, nuestra calidad de vida. Pero esto también funciona en el sentido contrario. Hoy en día, un gran número de personas mantienen estilos de vida que no son beneficiosos para la salud, basando su dieta en alimentos proinflamatorios, favoreciendo así el desarrollo de enfermedades crónicas.</p>
               <Link to="/recetas">
                  <Button primary bgGradient>Ver Recetas</Button>
               </Link>
               <Link to="/recetas/crear">
                  <Button radio>Crear Receta</Button>
               </Link>
            </ContainerTexto>
            <ContainerImagen >
               <img src={peruvian_food} alt="peruvian_food" />
            </ContainerImagen>
      </GeneralBgStyled>
   )
}

export const Button = styled(ButtonTemplate)`
   background: ${props => props.bgGradient ? `linear-gradient(to left, ${COLORS.SECOND_GREEN}, ${COLORS.PRIMARY_GREEN})` : ""};
   border: none;
   height: 40px;
   margin: 20px;

   ${props => props.radio ? "border-radius: 20px; background:black; color:white" : ""};

   &:hover{
      background: ${COLORS.SECOND};
      color: ${COLORS.PRIMARY_GREEN};
      ${props => props.radio ? "background:white; color:black" : ""};
   }  
`

const ContainerImagen = styled.div`
   width: 600px;
   border-radius: 3rem;
   box-shadow: 0px 0px 50px 50px rgba(0,0,0,0.5);
   overflow: hidden;
   img{
      width: 100%;
      object-fit: cover;
   }
`

export default HomeComponent