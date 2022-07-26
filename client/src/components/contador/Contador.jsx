import { useEffect } from "react"
import { useState } from "react"

function Contador() {
   const [contador, setContador] = useState(0)
   
   const incrementar = () => {
      setContador(contador + 1)
   }
   
   const decremetar = () => {
      setContador(contador - 1)
   }
   
   const reset = () => {
      setContador(0)
   }

   useEffect(()=>{
      console.log("Hola Axel que tal!!")
   },[])

   return (
    <div>
      <h1>CONTADOR:</h1>
      <h3>{contador}</h3>
      <button onClick={incrementar}>+1</button>
      <button onClick={decremetar}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Contador