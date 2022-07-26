import styled from "styled-components"

function BurgerButtonComponent( props ) {
  return (
   <BurgerContainer onClick={props.setClicked}>
      <div className={`bar1 ${ props.clicked ? "change" : ""}`}></div>
      <div className={`bar2 ${ props.clicked ? "change" : ""}`}></div>
      <div className={`bar3 ${ props.clicked ? "change" : ""}`}></div>
   </BurgerContainer>
  )
}

const BurgerContainer = styled.div`
   display: inline-block;
   cursor: pointer;
   
   .bar1, .bar2, .bar3{
      width: 35px;
      height: 5px;
      background-color: white;
      margin: 6px 0;
      transition: 0.4s;
   }

   .change.bar1{
      -webkit-transform: rotate(0.13turn) translate(-7px, 7px);
      transform: rotate(-0.13turn) translate(-7px, 7px);
   }

   .change.bar2{
      opacity: 0;
   }

   .change.bar3{
      -webkit-transform: rotate(0.13turn) translate(-8px, -8px);
      transform: rotate(0.13turn) translate(-8px, -8px);
   }
`

export default BurgerButtonComponent