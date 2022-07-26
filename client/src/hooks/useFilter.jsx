import { useState } from 'react'
import { useSelector } from 'react-redux'

const initialState = {
   recipes:[],
   filtered: [],
   type: "",
   order:{
      name: "alphabetic",
      alphabetical: true,
      healthScore: true,
   },
   search: "",
   page:{
      total: 0,
      current: 1,
      data:[]
   }
}

function useFilter( recipes ){
   const recetas = useSelector( state => state.recipeStore.recipes )
   const [controller, setController] = useState({...initialState})

   const recipesChange = (name = "all") => {
      if ( name === "all" ){
         setController({
            ...controller,
            filtered: recipes
         })
      }else{
         setController({
            ...controller,
            filtered: recipes
         })
      }
   }

   const typeChange = (e) => {
      const type = e.target.id
      setController({
         ...controller,
         type: e.target.id,
         filtered: recipes.filter(({diets}) => diets.some(dieta => dieta.name === type))
      })
   }
   
   const searchChange = (e) => {
      setController({
         ...controller,
         search: e.target.value,
         filtered: controller.filtered.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
      })
   }

   const orderChange = (e) => {
      setController({
         ...controller,
         order: {
            ...controller.order,
            name: e.target.value
         }
      })
   }

   const alphabeticalChange = () => {
      setController({
         ...controller,
         order: {
            ...controller.order,
            alphabetical: !controller.order.alphabetical,
         }
      })

      if ( controller.order.alphabetical ){
         controller.filtered.sort( ( a, b ) => a.title.localeCompare(b.title) )
      } else {
         controller.filtered.reverse()
      }
   }

   const healthScoreChange = () => {
      setController({
         ...controller,
         order: {
            ...controller.order,
            healthScore: !controller.order.healthScore,
         }
      })
      if ( controller.order.healthScore ){
         controller.filtered?.sort( ( a, b ) => a.healthScore - b.healthScore )
      }else{
         controller.filtered?.reverse()
      }
   }

   const pageChange = ( id=1 ) => {
      setController({
         ...controller,
         page:{
            ...controller.page,
            total: Math.round(controller.filtered.length/9),
            current: id,
            data: controller.filtered.slice( (id-1)*9, id*9 ) 
         }
      })
   }

   const mostrar = () => {
      setController({
         ...controller,
         recipes: recetas,
         filtered: recetas
      })
      console.log(controller)
   }

   return {
      controller,
      recipesChange,
      typeChange,
      searchChange,
      orderChange,
      alphabeticalChange,
      healthScoreChange,
      pageChange,
      mostrar,
   }

}

export default useFilter