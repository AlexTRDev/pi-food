import axios from "axios";
const URL = "http://localhost:8000/diets"

const GET_ALL = "@GET/dietAll"
const GET_BY_ID = "@GET/dietById"
const POST = "@POST/diet"
const PUT_BY_ID = "@PUT/dietById"
const DELETE_BY_ID = "@DELETE/dietById"

const getAllDiets = () => async (dispatch) =>  {
      try {
         const { data } = await axios( URL )
         return data.data ? dispatch( { type: GET_ALL, payload: data.data } ) : data   
      } catch (error) {
         console.log(error)
      }
}

// const getDiet = ( id ) => async ( dispatch ) => {}
// const createDiet = ( diet ) => async ( dispatch ) => {}
// const updateDiet = ( diet ) => async ( dispatch ) => {}
// const deleteDiet = ( id ) => async ( dispatch ) => {}

export{
   GET_ALL,
   GET_BY_ID , 
   POST , 
   PUT_BY_ID , 
   DELETE_BY_ID , 
   getAllDiets,
}