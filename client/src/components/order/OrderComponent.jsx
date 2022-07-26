import styled from 'styled-components'
import ButtonTemplate from 'components/template/ButtonTemplate'
import { COLORS } from "assets/util/globales"

function OrderComponent( { order, alphabetical ,healthScore, orderChange, alphabeticalChange, healthScoreChange} ) {


   return (
      <ContainerOrder>
         <ContainerSortType onChange={orderChange} >
            <div>
               <input type="radio" value="alphabetical" name="order" defaultChecked/> Alfabetico
               {
                  alphabetical ? <ButtonOrderAZ  primary oculto={order} onClick={alphabeticalChange}>Az</ButtonOrderAZ> : <ButtonOrderAZ  primary oculto={order} onClick={alphabeticalChange}>Za</ButtonOrderAZ>
               }
            </div>
            <div>
               <input type="radio" value="healthScore" name="order"  /> Puntos de Salud
               {
                  healthScore ? <ButtonOrder19  primary oculto={order} onClick={healthScoreChange}>HS-</ButtonOrder19> : <ButtonOrder19  primary oculto={order} onClick={healthScoreChange}>HS+</ButtonOrder19>
               }
            </div>
         </ContainerSortType>
      </ContainerOrder>
   )
}

const ContainerSortType = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   color: ${COLORS.SUCCESS_SECONDARY};
   input {
      cursor: pointer;
      margin: 10px 5px 10px 20px;
   }

   div{
      width: 150px;
      height: 65px;
      justify-content: flex-start;
   }

`

const ContainerOrder = styled.div`
   img{
      cursor: pointer;
   }
`

const ButtonOrderAZ = styled(ButtonTemplate)`
   width: 50px;
   height: 30px;
   border-radius: 15px;
   display: ${props => props.oculto === "alphabetical" ? "" : "none"};

   &:hover{
      transform: scale(1.1);
   }
`

const ButtonOrder19 = styled(ButtonTemplate)`
   width: 50px;
   height: 30px;
   border-radius: 15px;

   display: ${props => props.oculto === "alphabetical" ? "none" : ""};
   &:hover{
      transform: scale(1.1);
   }
`

export default OrderComponent