import { useSelector } from "react-redux"
import styled from "styled-components"
import { GeneralBgStyled, ContainerTexto } from "components/layout/GeneralBgStyled"
import check from "assets/icons/check.svg"
import add from "assets/icons/add.svg"
import { icons } from "assets/icons"

function DietsComponent() {
   const diets = useSelector( state => state.dietStore.diets )

  return (
    <GeneralBgStyled className='scroll-page' id="diets" column>
      <Contenido>
         <h1>Disponemos de una gran <span>Variedad de Dietas</span></h1>
         <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock</p>
      </Contenido>
      <ContainerBody >
         {
            diets && diets.map( (diet) => 
               <Diet key={diet.name}>
                  <img src={icons[diet.name]} alt={diet.name} />
                  <span>{diet.name}</span>
               </Diet> 
            )
         }
      </ContainerBody>
    </GeneralBgStyled>
  )
}

const Contenido = styled(ContainerTexto)`
   width: 70%;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: flex-start;
   margin: 20px auto;
`
const ContainerBody = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-items: center;
   justify-content: flex-start;
   width: 50vw;
   height: 50vh;
   border-radius: 15px;
   padding: 20px;
   border: 1px solid rgba(255,255,255,0.3);
   box-shadow: 0px 0px 20px rgba(255,255,255,0.5);
`
const Diet = styled.div`
   width: 150px;
   display: flex;
   align-items: center;
   justify-content: center;
   color: white;
   img{
      margin: 10px;
   }
   span{
      font-size: 1rem;
      text-transform: uppercase;
   }

   .add{
      width: 50px;
      cursor: pointer;
   }
`

export default DietsComponent