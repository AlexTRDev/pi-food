import styled from "styled-components"
import { GeneralBgStyled, ContainerTexto } from "components/layout/GeneralBgStyled"
import CardUser from "components/cards/CardUser"
import profile from "assets/images/profile.png"

const user1 = {
   name: "Carlos Gutierrez",
   ocupation: "Chef",
   image: "https://st2.depositphotos.com/1158045/7470/i/450/depositphotos_74708117-stock-photo-smiling-chef-in-his-kitchen.jpg",
   sociales: [
      {instagram: "https://www.instagram.com/"},
      {whatsapp: "https://www.whatsapp.com/"},
      {github: "https://www.github.com/"},
   ]
}
const user2 = {
   name: "Gaston Acurio",
   ocupation: "Chef",
   image: "https://www.yakumanka.com/wp-content/uploads/2018/12/gaston-acurio-cover1.jpg",
   sociales: {
      instagram: "https://www.instagram.com/",
      whatsapp: "https://www.whatsapp.com/",
      github: "https://www.github.com/",
   }
}
const user3 = {
   name: "Alex Terrones",
   ocupation: "Developer & Designer",
   image: profile,
   sociales: [
      {instagram: "https://www.instagram.com/alex.t.rivera/"},
      {whatsapp: "https://www.facebook.com/Alex.Terrones.Rivera/"},
      {github: "https://github.com/AlexTRDev"},
   ]
}

function AboutComponent() {
  return (
    <GeneralBgStyled className='scroll-page' id="about" primary column>
      <Contenido>
         <h1>Los Mejores Chefs a <span>Nivel Mundial</span></h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at hendrerit eros. Etiam dolor elit, varius at urna ut, luctus aliquet mauris.</p>
      </Contenido>
      <ContainerImagen >
         <CardUser {...user1} />
         <CardUser {...user2} />
         <CardUser {...user3} />
      </ContainerImagen>
    </GeneralBgStyled>
  )
}

const Contenido = styled(ContainerTexto)`
   width: 70%;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: flex-start;
`
const ContainerImagen = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-items: center;
   justify-content: center;
   width: 80%;
`

export default AboutComponent