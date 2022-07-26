import { useState } from 'react';

function useFavorite() {
   const [favorite, setFavorite] = useState(false);

   const toggleFavorite = () => {
      setFavorite(!favorite);
   }

   return [favorite, toggleFavorite];
}

export default useFavorite