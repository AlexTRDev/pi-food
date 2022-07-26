import image from "assets/icons/cooking.png"
import { Link } from "react-router-dom"
import styled from "styled-components"

const COLORS = {
   NO_SELECT : "#AAAAAA",
   PRIMARY : "#00BB55",
   DARK : "#0A0A0A",
   DARK_SECOND:"#222222",
   SUCCESS :"#00AFFF",
   DANGER : "#FF5060",
   SECOND : "#FFFFFF"
 }

function LogoComponent() {
  return (
    <LogoContainer {...COLORS}>
          <img src={image} alt="logo-henry" />
          <h2>Henry <span>Food</span></h2>
    </LogoContainer>
  )
}

const LogoContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-wrap: wrap;
   img{
      width: 50px;
   }
   h2{
    position: left;
    font-weight: 400;
    color:${({NO_SELECT}) => NO_SELECT};
    span{
      font-weight: bold;
      color:${({SECOND}) => SECOND};
    }
  }
`

export default LogoComponent