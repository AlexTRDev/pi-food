import styled from "styled-components"
import { COLORS } from "assets/util/globales"
import { socialIcons } from "assets/icons"

function FooterComponent() {
  return (
    <FooterContainer primary>
      <RedesSociales>
         <h3>Siguenos:</h3>
         <img src={socialIcons.instagram_white} alt="insta"/>
         <img src={socialIcons.whatsapp_white} alt="wsp" />
         <img src={socialIcons.github_white} alt="github" />
      </RedesSociales>
      <DerechosReservados>
         <p>© 2022 Todos los derechos reservados</p>
      </DerechosReservados>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
   width: 100%;
   padding: 20px 0;
   height: 70px;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: space-around;
   align-content: center;
   align-items: center;
   background-color: ${props => props.primary ? COLORS.PRIMARY_DARK : COLORS.SECOND_DARK};
`
const RedesSociales = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: space-around;
   color:white;
   h3{
      font-size: 1.3rem;
      margin: 0 10px;
      font-weight: 400;
   }
   
   img{
      cursor: pointer;
      width: 30px;
      margin: auto 10px;
   }
`
const DerechosReservados = styled.div`
   color: white;
`

export default FooterComponent