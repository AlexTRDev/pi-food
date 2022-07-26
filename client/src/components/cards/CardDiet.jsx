import { icons } from "assets/icons"
import styled from "styled-components"

function CardDiet({diet, handleDelet}) {
  return (
      <DietIcono id={diet.name} name={diet.name} src={icons[diet.name]} alt={diet.name} title={diet.name} onClick={handleDelet}/>
  )
}

const DietIcono = styled.img`
   width: 40px;
   cursor: pointer;
   margin: 7px;
`

export default CardDiet