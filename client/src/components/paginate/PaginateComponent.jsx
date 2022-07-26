import styled from "styled-components"
import ButtonTemplate from "components/template/ButtonTemplate"

function PaginateComponent({total, current, paginateChange}) {
   return (
      <ContenedorPage>
         {
            Array.from({length: total}, (x, i) => i + 1)
            .map(page => 
               page !== current ?   
               <ButtonPage key={page} primary  onClick={()=>paginateChange(page)} >{page}</ButtonPage> : 
               <ButtonPage key={page}  onClick={()=>paginateChange(page)} >{page}</ButtonPage>
            )
         }
      </ContenedorPage>
   )
}

const ContenedorPage = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: center;
   align-content: center;
   padding: 20px;
`

const ButtonPage = styled(ButtonTemplate)`
   width: 35px;
   height: 35px;
   padding: 0;
   border-radius: 50%;
   border: none;

   ${props => props.primary ? `` : `transform: scale(1.2); font-size: 1.3rem; font-weight: bold;`}
`

export default PaginateComponent