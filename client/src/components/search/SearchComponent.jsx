import { COLORS } from "assets/util/globales"
import iconSearch from "assets/icons/search.svg"
import styled from "styled-components"

function SearchComponent ( props ) {
   const { searchChange } = props
   return (
      <Container>
         <Search type="search" name="search" placeholder="Busca una receta..." onChange={searchChange}/>
         <IconSearch src={iconSearch} alt="iconSearch"/>
      </Container>
   )
}

const Container = styled.div`
   min-width: 30%;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
`

const IconSearch = styled.img`
   position: absolute;
   width: 1.5rem;
   top:14px;
   left: 10px;
`

const Search = styled.input`
   width: 100%;
   height: 30px;
   border-radius: 10px;
   padding-left: 35px;
   margin: 10px 0;
   font-size: 1.2rem;
   font-weight: 400;
   color: ${COLORS.SUCCESS_SECONDARY};
   border: 2px solid rgba(0,0,0,0.2);
   box-shadow: 1px 1px 5px 1px rgba(255,255,255,0.5);
   background-color: #f3f3f3;
   &:focus {
      outline: none;
   }

   &::placeholder {
      color: ${COLORS.SUCCESS};
      font-size: 1.1rem;
      font-weight: 300;
   }

`


export default SearchComponent