import styled from "styled-components"
import eliminar from "assets/icons/eliminar.svg"
import { COLORS } from "assets/util/globales"

function CardStep({id, name, handleDelete}) {
  return (
    <CardStepContainer sombra>
      <h1>{name}</h1>
      <img src={eliminar} alt="eliminar" id={id} onClick={handleDelete}/>
    </CardStepContainer>
  )
}

const CardStepContainer = styled.div`
  height: 36px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 0px 5px;
  border: ${props => props.borde ? "1px solid " + props.borde : "none"};
  border-radius: 5px;
  background-color: transparent;
  box-shadow: ${props => props.sombra ? "1px 1px 5px 1px rgba(0,0,0,0.5) " : "none"};

  img{
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin: 0px;
    padding: 0px;
  }

  h1{
    color: ${COLORS.SUCCESS_SECONDARY};
    margin: 0 5px;
    font-size: .8rem;
    text-transform: uppercase;
  }
`

export default CardStep