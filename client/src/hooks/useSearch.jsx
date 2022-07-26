import { useState } from "react";
import { useSelector } from "react-redux";

const initialState = {
   recipes: [],
   search: [],
   valor: "",
   tipo:""
}

function useSearch() {
   const recipes = useSelector(state => state.recipes)
   const [valor, setValor] = useState(initialState.valor);
   const [encontrados, setEncontrados] = useState(initialState.search);
   const [tipo, setTipo] = useState(initialState.tipo);


   const tipoChange = (e) => {
      setTipo(e.target.id);
      console.log(e.target.id);
      console.log({tipo})
   }

   const valorChange = (e) => {
      setValor(e.target.value)
   }
   
   const buscar = () => {
      let filtrados =   valor ? recipes.filter( item => item.title.toLowerCase().includes(valor.toLowerCase()) ) : recipes;
      filtrados = tipo ? filtrados.filter( item => item.diets.includes(tipo) ) : filtrados;
      setEncontrados(filtrados)
   }

   return {
      valor,
      valorChange,
      buscar,
      encontrados,
      tipoChange
   }

}

export default useSearch;