import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBarComponent from '../components/nav/NavBarComponent';
import { getAllRecipes } from 'redux/actions/recipeAction';
import { getAllDiets } from 'redux/actions/dietAction';
import styled from 'styled-components';
import './App.css';

function App () {
  const items = [{ name: "Home", path: "#home" }, { name: "Recetas", path: "#recipes" }, { name: "Dietas", path: "#diets" }, { name: "Sobre Nosotros", path: "#about" }, { name: "Contactanos", path: "#contact" }]
  const dispatch = useDispatch()
  
  useEffect(() =>{
    // getAllRecipes()(dispatch)
    getAllDiets()(dispatch)
  },[dispatch])

  return (
      <div className="App">
          <NavBarComponent items={items} />
        <ContentBoody>
          <Outlet/>
        </ContentBoody>
      </div>
  );
}

const ContentBoody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
`

export default App;
