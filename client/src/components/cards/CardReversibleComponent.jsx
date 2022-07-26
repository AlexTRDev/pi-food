import useFavorite from "hooks/useFavorite";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { COLORS } from "assets/util/globales";
import { icons } from "assets/icons"

function CardReversibleComponent( { id, title, image, diets, healthScore, readyInMinutes } ) {
   const [ isFavorite, toggleFavorite ] = useFavorite()

   return (
      <Card>
         <Front className="front" >
            <img src={image} alt={title} />
            <h3>{title}</h3>
         </Front>

         <Back className="back">
            <h2>{title}</h2>
            <Body>
               <h3>
                  Puntos de salud:
                  <span> {healthScore}%</span>
               </h3>
               <h3>
                  Tiempo de Preparacion:
                  {
                     readyInMinutes ? <span> {readyInMinutes} min</span> : <span> No disponible</span>
                  }
               </h3>
               <div>
               <h3>Diets: </h3>
                  <div>
                     {
                        diets && diets.map((diet, index) => (
                           <img key={`${index}  ${diet.name}`} id={diet.name} name={diet.name} src={icons[diet.name]} alt={diet.name} title={diet.name} />
                        ))
                     }
                  </div>
               </div>
            </Body>
            <hr />
            <Footer>
               {
                  isFavorite ? <img  src={icons["favorite_primary"]} alt="favorite_primary" onClick={toggleFavorite}/> :  <img  src={icons["favorite_white"]} alt="favorite_white" onClick={toggleFavorite}/>
               }
               <i>
                  <Link to={`/recetas/detalle/${id}`}>More Details</Link>
               </i>
            </Footer>
         </Back>
      </Card>
   )
}


const Card = styled.div`
   position: relative;
   width: 250px;
   height: 265px;
   margin: 20px;
   &:hover .front{
      transform: perspective(600px) rotateY(180deg);
   }
   &:hover .back{
      transform: perspective(600px) rotateY(360deg);
   }
`

const TemplateCard = styled.div`
   position: absolute;
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin: 20px 10px;
   background-color: rgba(255, 255, 255, 0.1);
   border-radius: 15px;
   overflow: hidden;
   box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
   backdrop-filter: blur(5px);
   -webkit-backdrop-filter: blur(5px);
   transition: all 1s;
   backface-visibility: hidden;
`

const Front = styled(TemplateCard)`
   transform: perspective(600px) rotateY(0deg);

   img{
      position: absolute;
      top: 0;
      left: 0;
      width: 290px;
      object-fit: fill;
   }

   h3{
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: 0;
      width: 100%;
      height: 50px;
      padding: 0 10px;
      font-size: 1rem;
      font-weight: 400;
      color: ${COLORS.SECOND_GREEN};
      background-color: rgba(0, 0, 0, 0.6);
      text-align: center;
      color: white;
      text-transform: uppercase;
   }
`

const Back = styled(TemplateCard)`
   padding: 10px 20px;
   transform: perspective(600px) rotateY(180deg);
   color: white;

   h2 {
      color: ${COLORS.SECOND_GREEN};
      font-size: 1.3rem;
      font-weight: bold;
      text-align: center;
   }

   hr {
      width: 90%;
      bottom: 40px;
      position: absolute;
      border: none;
      height: 0.1px;
      background-color: #ffffff38;
   }

   img {
      width: 30px;
      padding: 2px;
   }

`;

const Body = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   height: 280px;
   h3 {
      font-size: 1rem;
      font-weight: 500;
      margin-top: 5px;
   }
   p {
      padding-top: 10px;
      text-align: justify;
      font-size: 0.8rem;
      font-weight: 300;
   }
`;

const Footer = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   margin-top: 10px;
   h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 400;
   }
   a {
      color:${COLORS.SECOND_GREEN};
      font-size: 0.9rem;
      font-weight: 200;
   }
   
   img{
      transition: all 0.8s;
      cursor: pointer;
      &:hover{
         transform: scale(1.2);
      }
   }
`;

export default CardReversibleComponent