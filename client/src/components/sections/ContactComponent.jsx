import FooterComponent from "components/footer/FooterComponent"
import { GeneralBgStyled, ContainerTexto } from "components/layout/GeneralBgStyled"
import { COLORS } from "assets/util/globales"
import ButtonTemplate from "components/template/ButtonTemplate"
import peru from "assets/icons/peru.svg"
import gmail from "assets/icons/gmail.svg"
import styled from "styled-components"

function ContactComponent() {
  return (
    <Container className='scroll-page' id="contact" column>
      <Contenido>
         <h1>Aquí puedes <span>Contactarnos</span></h1>
         <p>Morbi in scelerisque tellus. Vivamus vitae sapien vel sem placerat eleifend in quis sem. Maecenas sagittis hendrerit velit in sollicitudin. Donec at lacinia massa.</p>
      </Contenido>
      <ContainerBody >
         <div className="izq">
            <Contenido>
               <h1><span className="secundario">Visita Nuestra Oficina</span></h1>
               <p>Cajamarca-Chota</p>
               <img src={peru} alt="peru" />
            </Contenido>
            <Contenido>
               <h1><span className="secundario">Mensajes directos</span></h1>
               <p>alextrdev@gmail.com</p>
               <img src={gmail} alt="gmail" />
            </Contenido>
         </div>
         <ContainerMensaje>
            <input type="text" placeholder="Nombre"/>
            <input type="text" placeholder="Correo electronico"/>
            <textarea name="mensaje"  cols="15" rows="6" placeholder="Mensaje"></textarea>
            <ButtonMensaje primary bgGradient>Enviar</ButtonMensaje>
         </ContainerMensaje>
      </ContainerBody>
    </Container>
  )
}

const Container = styled(GeneralBgStyled)`
   height: calc(100vh - 140px);
   display: flex;
   flex-direction: column;
   flex-wrap: nowrap;
   align-items: center;
   justify-content: center;

`

const ButtonMensaje = styled(ButtonTemplate)`
   border: none;
   height: 30px;
   margin: 10px;
   background: ${props => props.bgGradient ? `linear-gradient(to left, ${COLORS.SUCCESS}, ${COLORS.SUCCESS})` : ""};

   ${props => props.radio ? "border-radius: 20px; background:black; color:white" : ""};

   &:hover{
      transition: all 0.7s ease-in-out;
      background: ${COLORS.SECOND_GREEN};
      color: ${COLORS.SECOND};  
      ${props => props.radio ? "background:white; color:black" : ""};
   }  
`

const ContainerMensaje = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   padding: 20px;
   
   input{
      color:white;
      width: 300px;
      margin: 10px 0;
      background: transparent;
      border: 1px solid ${COLORS.SECOND_DARK};
      text-align: center;
      border-radius: 5px;
      box-shadow: 0 0 20px 10px rgba(0,0,0,0.5);
   }
   textarea{
      width: 300px;
      margin: 10px 0;
      color:white;
      text-align: center;
      background: transparent;
      border: 1px solid ${COLORS.SECOND_DARK};
      border-radius: 5px;
      box-shadow: 0 0 20px 10px rgba(0,0,0,0.5);
   }
`

const Contenido = styled(ContainerTexto)`
   display: flex;
   flex-direction: column;
   flex-wrap: nowrap;
   justify-content: flex-start;
   margin: 20px;
   color: white;
   padding: 10px;
   width: 70%;
`

const ContainerBody = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-items: center;
   justify-content: space-around;
   border-radius: 15px;
   border: 1px solid rgba(255,255,255,0.3);
   box-shadow: 0px 0px 20px rgba(255,255,255,0.5);
   .izq{
      margin: auto 20px;
      img{
         width: 30px;
      }
      h1 {
         width: max-content;
      }
   }
   .secundario{
      font-size: 1.5rem;
   }
`

export default ContactComponent