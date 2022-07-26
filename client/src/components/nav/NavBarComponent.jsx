import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoComponent from "components/logo/LogoComponent";
import BurgerButtonComponent from "components/template/BurgerButtonComponent";
import ButtonTemplate from "components/template/ButtonTemplate";
import { COLORS } from "assets/util/globales";
import useBurguer from "hooks/useBurguer";

function NavBarComponent ({ items }) {
  const [isActive, activar] = useBurguer()

  return (
      <NavContainer {...COLORS}>
        <LogoComponent />
        <div className={`links ${ !isActive ? "isActive" : ""}`}>
          {
            items.map(({ name, path }) => (

                <a href={`${ path }`} key={name} >{ name }</a>
            ))
          }
          <ButtonTemplate primary>Log In</ButtonTemplate>
        </div>
          <div className="burger">
            <BurgerButtonComponent clicked={isActive} setClicked={activar}/>
          </div>
            <GbColor className={`${ isActive ? "isActive" : ""} `} {...COLORS}/>
      </NavContainer>
  );
}

const NavContainer = styled.nav`
  /* position: fixed; */
  z-index: 999;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding-right: 10px;
  padding-left: 10px;
  background-color:${COLORS.PRIMARY_DARK} ;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 20px 0px rgba(255,255,255,0.5);

  a{
    color:${COLORS.NO_SELECT};
    text-decoration: none;
    text-align: center;
    margin: 5px 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${COLORS.NO_SELECT};
  }

  
  .links{
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    top: -700px;
    left: -2000px;
    transition: all 1s ease;
    
    @media (max-width: 768px) {
      position: absolute;
      display: none;
      width: 100%;
      top: 30%;
      left: 0;
      flex-direction: column;
      transition: all 1s ease;
      a{
        font-size: 2rem ;
        margin-bottom: 20px;
        
      }
      div{
        width: 80%;
        margin-bottom: 10px;
      }
    }
  }
  
  .burger{
    @media( min-width: 768px ){
      display: none;
    }
  }
`
const GbColor = styled.div`
  background-color:${({DARK_SECOND}) => DARK_SECOND} ;
  position: absolute;
  top: -700px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all 1s ease;
  &.isActive{
    top: 0;
    left: 0;
    border-radius: 0px 0px 80% 0px;
    transition: all 1s ease;
    @media( min-width: 768px ){
      display: none;
    }
  }

`


export default NavBarComponent;
