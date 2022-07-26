import { COLORS } from "assets/util/globales"
import styled from "styled-components"

const ButtonTemplate = styled.button`
  background: ${({primary, colorButton=COLORS.DANGER}) => primary ? colorButton : "white"};
  color: ${({primary, colorButton=COLORS.DANGER}) => primary ? "white" : colorButton};

  ${({bgGradient, colorButton=COLORS.DANGER}) => bgGradient && `background: linear-gradient(to left, ${colorButton}, ${colorButton});`}

  border-radius: 3px;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 1.2rem;
  border: none;
  outline: none;
  margin: 10px;
  border: 3px solid ${({border, colorButton= COLORS.DANGER}) => border ?  colorButton : "none"};
  transition: all .7s ease-in-out;

  &:hover{
    background-color: ${({primary, colorButton= COLORS.DANGER}) => primary ? "white" : colorButton};
    color:${({primary, colorButton= COLORS.DANGER}) => primary ? colorButton : "white"};
    transform: scale(1.05);
    ${({bgGradient, colorButton=COLORS.DANGER}) => bgGradient && `color: ${colorButton}); background: white;`};
    font-weight: 500;
  }
`

export default ButtonTemplate
