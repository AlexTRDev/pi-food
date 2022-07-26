//import hooks de react
import { useState, useEffect } from 'react'

//Estado inicial
const INICIAL_STATE = {
    data : null,
    isWaiting: true,
    error: null
}
//custom hook
export function useFetch(url) {
    // control de Datos, Espera y error
    const [connection, setConnection] = useState(INICIAL_STATE)
    // control de la respuesta de la conexion

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(url)
                if (!response.ok) {
                //manejo del error
                    throw {
                        error:true,
                        status: response.status,
                        statusText: response.statusText ?? "Ocurrio un error" 
                    }
                } 
                //Cambiando el tipo de dato de la respuesta
                const data = await response.json()
                setConnection({
                    ...connection,
                    data: data, 
                    isWaiting: false,
                    error: "No hubo error"
                    })
            } catch (error) {
                setConnection({
                    ...connection,
                    isWaiting: false,
                    error: error
                })
            }
        }
        //Invocar la funcion getData para obtener los datos
        getData()
    },[url]) // solo se ejecuta cuando se cambia la url

    return connection
}
