import styled, { keyframes } from "styled-components"
import { COLORS } from "assets/util/globales"

function BgDiamondComponent() {
   return (
      <ContainerDiamond >
         <Rombo
            size={"200px"} 
            gradLeft={COLORS.DANGER} 
            gradRight={COLORS.SUCCESS} 
            posTop={"200px"} 
            posRigth={"200px"} 
            rotation="45deg"
            animacion="t1 5s ease infinite"
         />
         <Rombo 
            size={"150px"} 
            gradLeft={COLORS.DANGER} 
            gradRight={COLORS.SECOND_GREEN} 
            posTop={"400px"} 
            rotation="45deg"
            animacion="t2 6s ease infinite"
         />
         <Rombo 
            size={"200px"} 
            gradLeft={COLORS.PURPLE_PRIMARY} 
            gradRight={COLORS.PRIMARY_RED} 
            posLeft={"200px"}
            posTop={"150px"} 
            rotation="45deg"
            animacion="t3 9s ease infinite"
            borderRadius="50%"
         />
      </ContainerDiamond>
   )
}

const ContainerDiamond = styled.div`
   max-width: 1200px;
   height: 600px;
   margin: auto;
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: -1;
   @keyframes t1 {
      0% {
         transform: rotate(45deg) translateY(0px);
      }
      50% {
         transform: rotate(45deg) translateY(50px);
      }
      100% {
         transform: rotate(45deg) translateY(0px);
      }
   }
   @keyframes t2 {
      0% {
         transform: rotate(65deg) translate(0px);
      }
      50% {
         transform: rotate(65deg) translate(30px);
      }
      100% {
         transform: rotate(65deg) translate(0px);
      }
   }
   @keyframes t3 {
      0% {
         transform: rotate(0deg) translateX(0px);
      }
      50% {
         transform: rotate(360deg) translateX(100px);
      }
      100% {
         transform:  rotate(720deg) translateX(0px);
      }
   }

`  

const Rombo = styled.div`
   position: absolute;
   width:  ${( {size} ) =>size ?? ""};
   height: ${( {size} ) =>size ?? ""};
   background: linear-gradient( to left, ${( {gradLeft} ) =>gradLeft ?? ""}, ${( {gradRight} ) =>gradRight ?? ""});
   top: ${( {posTop} ) =>posTop ?? ""};
   right: ${( {posRigth} ) =>posRigth ?? ""};
   left: ${( {posLeft} ) =>posLeft ?? ""};
   bottom: ${( {posBottom} ) =>posBottom ?? ""};
   transform: rotate(${( {rotation} ) =>rotation ?? ""});
   animation: ${( {animacion} ) =>animacion ?? ""};
   border-radius: ${( {borderRadius} ) =>borderRadius ?? ""};

`

export {
   BgDiamondComponent as Diamond
}