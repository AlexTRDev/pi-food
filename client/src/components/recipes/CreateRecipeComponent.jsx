import { useDispatch, useSelector } from "react-redux"
import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { useModal } from "hooks/useModal"
import { createRecipe } from "redux/actions/recipeAction"
import styled from "styled-components"
import FilterComponent from "components/filter/FilterComponent"
import ModalComponent from "components/modals/Modalcomponent"
import { COLORS } from "assets/util/globales"
import ButtonTemplate from "components/template/ButtonTemplate"
import TextAreaTemplate from "components/template/TextAreaTemplate"
import {TextTemplate, NumberTemplate} from "components/template/InputTemplate"
import CardStep from "components/cards/CardStep"
import CardDiet from "components/cards/CardDiet"
import add_blue from "assets/icons/add_blue.svg"
import LogoComponent from "components/logo/LogoComponent"
import { getAllDiets } from "redux/actions/dietAction"

const initialState = {
   title: "",
   summary: "",
   healthScore: 50,
   readyInMinutes:5,
   steps: [],
   diets: [],
}


function CreateRecipeComponent () {
   //hooks - state
   const dietsStore = useSelector( state => state.dietStore.diets )
   const dispatch = useDispatch()
   const [recipe, setRecipe] = useState(initialState)
   //hooks - refs
   const step = useRef()
   const title = useRef()
   const sumary = useRef()
   const healthScore = useRef()
   const time = useRef()
   const urlImage = useRef()
   //Custom Hooks
   const [modals, openClose] = useModal()
   // const { preview, handleImage } = useUploadImage()

   useEffect(() => {
      getAllDiets()(dispatch)
   }, [])

   const handleStepEnter = (e) => {
      if (e.keyCode === 13) handleStep()
   }

   const handleStep = () => {
      if (step.current.value !== "") {
         setRecipe({
            ...recipe,
            steps: [...recipe.steps,{id: recipe.steps.length+1, name: step.current.value}]
         })
         step.current.focus()
         step.current.value = ""
      }
   }

   const handleDiet = (e) => {
      const diets = [...recipe.diets]
      const encontrado = diets.find(diet => diet.name === e.target.id)

      if (!encontrado) {
         const diet = dietsStore.find(diet => diet.name === e.target.id)
         diets.push(diet)
      }

      setRecipe({
         ...recipe,
         diets
      })

   }

   const handleDelet = (e) => {
      const id = e.target.id
      const newSteps = recipe.steps.filter(step => step.id !== Number(id))
      const newDiets = recipe.diets.filter(diet => diet.name !== id)
      
      setRecipe({
         ...recipe,
         steps: newSteps,
         diets: newDiets
      })
   }

   const handleChange = (e) => {
      setRecipe({
         ...recipe,
         [e.target.id]: e.target.value
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      if ( recipe.title.length === 0 ) return alert("El nombre es obligatorio")
      if ( recipe.summary.length === 0 ) return alert("La descripcion es obligatorio")
      if ( recipe.steps.length === 0 ) return alert("Debe agregar al menos un paso")
      if ( recipe.diets.length === 0 ) return alert("Debe agregar al menos una dieta")
      if ( recipe.healthScore < 5 || recipe.healthScore > 360 ) return alert("El puntaje debe estar entre 5 y 360 minutos")
      if ( recipe.image.length === 0) recipe.image = "https://random.imagecdn.app/300/300"

      recipe.diets = recipe.diets.map(diet => diet.id)
      recipe.steps = recipe.steps.map(step => {return {name: step.name}})
      console.log(recipe)
      createRecipe(recipe)(dispatch)
      setRecipe(initialState)
      title.current.value = ""
      sumary.current.value = ""
      healthScore.current.value = 50
      time.current.value = 5
      urlImage.current.value = ""
      alert("Receta creada correctamente!!!")
   }

   return (
      <ContainerForm>
         <LogoStyled>
            <Link to={"/"}>
               <LogoComponent />
            </Link>
         </LogoStyled>
         <Formulario >

            <LeftForm>
               <label htmlFor="title" >Nombre</label>
               <TextTemplate primary className="text" ref={title} type="text" id="title" placeholder="nombre" onChange={handleChange}/> 
               
               <label  htmlFor="summary">Descripción</label>
               <TextAreaTemplate ref={sumary} id="summary" rows="7" cols="25" placeholder="desc" onChange={handleChange}/>
               
               <label htmlFor="healthScore">Puntos de salud</label>
               <HealtScoreStyled>
                  <NumberTemplate ref={healthScore} type="range" id="healthScore" defaultValue={50} step={5} min={0} max={100} onChange={handleChange}/>
                  <span>{recipe.healthScore}%</span>
               </HealtScoreStyled>
            </LeftForm>

            <CenterForm>
               <CenterTop>
                  <Etiquetas>
                     <label>Pasos</label>
                     <ImageAdd src={add_blue} alt="add_blue" onClick={() => openClose("steps")}/>
                  </Etiquetas>
                  <ModalComponent
                     modal = { modals["steps"] }
                     closeModal = { () => openClose("steps") }
                     titulo = {"Agregar paso a paso"}
                     ancho = "450px"
                     padding = "40px"
                  >
                     <StepAdd>
                        <TextTemplate required colorText={COLORS.SUCCESS_SECONDARY} ref={step} type="text" placeholder="step" onKeyDown={handleStepEnter}/>
                        <ButtonConfirmed colorButton={COLORS.SUCCESS_SECONDARY} onClick={handleStep}>Agregar</ButtonConfirmed>
                     </StepAdd>
                     <ContainerData>
                        { recipe.steps.length>0 &&  recipe.steps.map((step) => (
                           <CardStep key={step.id} {...step} handleDelete={handleDelet}/>
                        ))}
                     </ContainerData>
                  </ModalComponent>
                  <ContainerData>
                     { recipe.steps.length>0 &&  recipe.steps.map((step) => (
                        <CardStep key={step.id} {...step} handleDelete={handleDelet}/>
                     ))}
                  </ContainerData>
               </CenterTop>

               <CenterBottom>
                  <Etiquetas>
                     <label>Dietas</label>
                     <ImageAdd src={add_blue} alt="add_blue" onClick={() => openClose("diets")}/>
                  </Etiquetas>
                  
                  <ModalComponent
                     modal = { modals["diets"] }
                     closeModal = { () => openClose("diets") }
                     titulo = {"Agregar dietas"}
                     ancho = { "630px" }
                  >
                  <FilterComponent handleDiet={handleDiet} diets={dietsStore}/>
                  <hr />
                  <h3>Número de dietas agregadas: <span className="number">{recipe.diets.length}</span></h3>
                  <hr />
                  <ContainerData centrar>
                     {
                        recipe.diets && recipe.diets.map(diet => (
                           <CardDiet key={diet.name} diet={diet} handleDelet={handleDelet}/>
                        ))
                     }
                  </ContainerData>
                  <hr />
                  </ModalComponent>
                  <ContainerData>
                     {
                        recipe.diets && recipe.diets.map(diet => (
                           <CardDiet key={diet.name} diet={diet} handleDelet={handleDelet}/>
                        ))
                     }
                  </ContainerData>
               </CenterBottom>

            </CenterForm>

            <RightForm>
               <BodyRight>
                  <ContainerRight>
                     <label htmlFor="time">Tiempo de Preparacion ( 5 - 360 min )</label>
                     <div className="time">
                        <NumberTemplate ref={time} type="number" id="readyInMinutes" placeholder="5" min={5} max={360} step={5} onChange={handleChange}/> 
                        <span>Minutos</span>
                     </div>
                     {/* <label htmlFor="image">Selecione imagen (PNG, JPG, JPEG)</label>
                     <input type="file" id="image" onChange={handleImage} /> */}

                     <label >Selecione imagen (URL)</label>
                     <TextTemplate primary ref={urlImage} className="text" id="image" type="text" placeholder="url" onChange={handleChange}/>
                     <ContainerImage>
                        {/* {preview && <img src={preview} />} */}
                        { recipe.image && <img src={recipe.image} />}
                     </ContainerImage>
                  </ContainerRight>
               </BodyRight>
               <FooterRight>
                  <ButtonConfirmed primary border colorButton={COLORS.SUCCESS_SECONDARY} onClick={handleSubmit}>Guardar Receta</ButtonConfirmed>
               </FooterRight>
            </RightForm>

         </Formulario>
      </ContainerForm>
   )
}

export const LogoStyled = styled.div`
   position: absolute;
   z-index: 999;
   top: 10px;
   left:10px;
   a{
      text-decoration: none;
   }
   h2{
      display: none;
   }
`

const StepAdd = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;
`

const ButtonConfirmed = styled(ButtonTemplate)`
   border-radius: 16px;
`

const ImageAdd = styled.img`
   margin-left: 10px;
   width: 18px;
   cursor: pointer;
   opacity: 0.8;
   transition: 400ms;
   &:hover {
      opacity: 1;
      transform: scale(1.2);
   }
`

const BodyRight = styled.div`
   width: 100%;
   align-items: center;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 15px;
`

const Etiquetas = styled.div`
   display: flex;
   justify-content: flex-start;
`

const ContainerRight = styled.div`
   width: 90%;
   height: 100%;
   display: flex;
   flex-direction: column;
   padding: 5px;
`

const ContainerImage = styled.div`  
   width: 250px;
   height: 250px;
   display: flex;
   justify-content: center;
   align-items: center;
   margin: 25px auto 0 auto;
   padding: 0;
   border: 1px solid rgba(255,255,255,0.1);
   border-radius: 16px;
   overflow-y: hidden;
   img {
      object-fit: cover;
      max-width: 100%;
   }
`

const FooterRight = styled.div`
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
`

const ContainerData = styled.div`
   border: ${({borde}) => borde ? borde : "1px solid rgba(255,255,255,0.1)"} ;
   width: 100%;
   height: 80%;
   max-height: 80%;
   overflow-y:auto;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-content: ${ ({centrar}) => centrar ? "center" : "flex-start" } ;
   justify-content: ${ ({centrar}) => centrar ? "center" : "flex-start" };
   margin-top: 10px;
   padding: 10px;
`

const LeftForm = styled.div`
   width: 300px;
   height: 500px;
   display: flex;
   flex-direction: column;
   flex-wrap: nowrap;
   align-content: center;
   justify-content: space-between;
   align-items: flex-start;
   padding-left: 15px;
   padding-right: 15px;
   padding-top: 20px;
   
`

const HealtScoreStyled = styled.div`
   width: 100%;
   display: flex;
   flex-direction: row;
   flex-wrap: nowrap;
   justify-content: space-between;

   span {
      color: ${COLORS.SUCCESS_SECONDARY};
   }

   input {
      width: 85%;
   }
`

const CenterForm = styled.div`
   width: 300px;
   height: 500px;
   display: flex;
   flex-direction: column;
   align-content: center;
   justify-content: center;
   margin: 10px auto;
   padding-left: 15px;
   padding-right: 15px;
   border-left: 1px solid rgba(255,255,255,0.1);
   border-right: 1px solid rgba(255,255,255,0.1);
   padding-top: 10px;
`

const CenterTop = styled.div`
   height: 50%;
   width: 100%;
   span {
      font-size: 1rem;
   }
`

const CenterBottom = styled.div`
   height: 50%;
   width: 100%;
   hr{
      margin: 10px 0;
      border-color: rgba(0,0,0,0.1);
   }

   h3{
      font-size: 1.1rem;
      color: ${COLORS.SUCCESS_SECONDARY};
      font-weight: lighter;
   }
   
   span.number {
      font-size: 1.2rem;
      font-weight: bold;
   }
`

const RightForm = styled.div`
   width: 320px;
   height: 500px;
   display: flex;
   flex-direction: column;
   align-content: center;
   justify-content: space-between;
   align-items: center;
   input {
      margin-top: 10px;
   }
   .time{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      margin-bottom: 20px;

      span {
         margin-top: 10px;
         margin-left: 5px;
         color: ${COLORS.SUCCESS_SECONDARY};
      }
   }
   
`

const Formulario = styled.div`
   display: flex;
   flex-wrap: wrap;
   background-color: ${COLORS.SECOND_DARK};
   border-radius: 15px;
   box-shadow: 0px 0px 20px 5px #5b5b5b88;
   padding-bottom: 20px;
   label {
      color: white;
   }
`

const ContainerForm = styled.div`
   postition: relative;
   width: 100vw;
   height: 100vh;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-items: center;
   justify-content: center;
   padding: 20px;
   font-weight: bold;
`

export default CreateRecipeComponent