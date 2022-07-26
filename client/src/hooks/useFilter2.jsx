import { useState } from 'react'


function useFilter(){
   const [ recipes, setRecipes ] = useState([])
   const [ filtered, setFiltered ] = useState([])
   const [ type, setType ] = useState("all")
   const [ order, setOrder ] = useState("alphabetical")
   const [ alphabetical, setAlphabetical ] = useState(true)
   const [ healthScore, setHealthScore ] = useState(true)
   const [ search, setSearch ] = useState("")
   const [ page, setPage ] = useState({
      total: 0,
      current: 0,
      data:[]
   })

   const recipesChange = ( data ) => {
      setRecipes(data)
      setFiltered(data)
   }

   const typeChange = (e) => {
      setType(e.target.id)
   }

   const searchChange = (e) => {
      setSearch(e.target.value)
   }

   const orderChange = (e) => {
      setOrder(e.target.value)
   }

   const paginateChange = (id) => {
      setPage({
         ...page,
         total: Math.ceil(filtered.length / 9),
         current: id,
         data: filtered.slice((id-1)*9, id*9)
      })
   }

   const alphabeticalChange = () => {
      setAlphabetical(!alphabetical)
   }

   const healthScoreChange = () => {
      setHealthScore(!healthScore)
   }

   const mostrar = () => {
      let filtrados = type !== "all" ? recipes.filter( item => item.diets.some(dieta => dieta.name === type) ) : recipes
      filtrados = search ? filtrados.filter( item => item.title.toLowerCase().includes(search.toLowerCase()) ) : filtrados
      
      if(order === "alphabetical") {
         filtrados = alphabetical ? filtrados.sort((a, b) => a.title.localeCompare(b.title)) : filtrados.sort((a, b) => b.title.localeCompare(a.title))
      } else {
         filtrados = healthScore ? filtrados.sort((a, b) => a.healthScore - b.healthScore) : filtrados.sort((a, b) => b.healthScore - a.healthScore)
      }
      
      setFiltered(filtrados)
      setPage({
         ...page,
         total: Math.ceil(filtrados.length / 9),
         current: 1,
         data: filtrados.slice(0, 9)
      })
   }

   return{
      page,
      filtered,
      search,
      type,
      order,
      alphabetical,
      healthScore,
      recipesChange,
      typeChange,
      searchChange,
      orderChange,
      alphabeticalChange,
      healthScoreChange,
      paginateChange,
      mostrar
   }
}

export default useFilter
