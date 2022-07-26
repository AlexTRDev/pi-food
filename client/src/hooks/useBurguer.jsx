import { useState } from "react"

function useBurguer() {
   const [isActive, setActive] = useState(false)

   const activar = () => {
      setActive(!isActive)
   }

   return [isActive, activar]
}
export default useBurguer
