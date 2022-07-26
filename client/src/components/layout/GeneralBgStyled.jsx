import styled from "styled-components";
import { COLORS } from "assets/util/globales";

const GeneralBgStyled = styled.section`
   width: 100%;
   height: calc(100vh - 70px); 
   display: flex;
   flex-direction: ${props => props.column ? "column" : "row"};
   flex-wrap: wrap;
   align-content: center;
   align-items: center;
   justify-content: space-around;
   background-color:${props => props.primary ? COLORS.PRIMARY_DARK : COLORS.SECOND_DARK};

  @media (max-width: 1200px) {
    height: auto;
  }
`

const ContainerTexto = styled.div`
   width: 500px;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-content: center;
   justify-content: center;
   margin: 10px 20px;

   h1{
      color: ${COLORS.SECOND};
      font-size: 2rem;
      font-weight: lighter;
   }

   span{
      background : linear-gradient(to left,${COLORS.PRIMARY_GREEN},${COLORS.SECOND_GREEN});
      font-size: 2.5rem;
      font-weight: bold;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent; 
   }
   p{
      color: ${COLORS.NO_SELECT};
      font-size: 1.2rem;
      font-weight: lighter;
      text-align: justify;
      margin-top: 20px;
   }
`

export{
  GeneralBgStyled,
  ContainerTexto
}