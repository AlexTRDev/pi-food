import { Link } from "react-router-dom"
import { socialIcons } from "assets/icons"
import styled from "styled-components"

function CardUser({name, ocupation, image, sociales}) {
  return (
   <CardStyled className="front" >
      <RecuadroImage>
         <img src={image} alt={image} />
      </RecuadroImage>
      <h1>{name}</h1>
      <h3>{ocupation}</h3>
      <SocialStyled>
         <a href={`${sociales["instagram"]}`}>
            <img src={socialIcons.instagram_white} alt="Instagram" />
         </a>
         <abbr href={`${sociales["whatsapp"]}`}>
            <img src={socialIcons.whatsapp_white} alt="Whatsapp" />
         </abbr>
         <a target="_blank" href={"https://github.com/AlexTRDev"} >
            <img src={socialIcons.github_white} alt="GitHub" />
         </a>
      </SocialStyled>
   </CardStyled>
  )
}

const SocialStyled = styled.div`
   position: relative;
   width: 100%;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-content: center;
   justify-content: center;
   align-items: center;
   margin-top: 10px;

   img{
      object-fit: fill;
      margin: 0 10px;
   }
`

const RecuadroImage = styled.div`
   width: 150px;
   height: 150px;
   border-radius: 50%;
   background-color: #fff;
   display: flex;
   justify-content: center;
   align-items: center;
   overflow: hidden;

   img{
      height: 100%;
      object-fit: cover;
   }

`

const CardStyled = styled.div`
   width: 250px;
   height: 300px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   border-radius: 1rem;
   padding: 10px;
   background-color: transparent;
   box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.3);
   color: white;
   margin: 30px;


   h1{
      margin: 10px;
      font-size: 1.5rem;
   }
   h3{
      font-size: 1rem;
   }

`


export default CardUser