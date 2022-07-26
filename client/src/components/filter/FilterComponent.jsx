import styled from "styled-components"
import { icons } from "assets/icons"
import { COLORS } from "assets/util/globales"

function FilterComponent( {typeChange, handleDiet, diets} ) {

	if ( typeChange ){
		return (
			<FilterContainer>
				<img src={icons["all"]} alt="all" title="all" id="all" onClick={typeChange}></img>
				{
					diets && diets.map((diet) => (<img key={diet.id} src={icons[diet.name]} alt={diet.name} title={diet.name} id={diet.name} onClick={typeChange}></img>))
				}
			</FilterContainer>
		)

	}
	
	if ( handleDiet ) {
		return (
			<FilterContainer2 className="create">
				{	
					diets && diets.map((diet) => (
						<CardDiet id={diet.name} key={diet.id} onClick={handleDiet}>
							<img id={diet.name} src={icons[diet.name]} alt={diet.name} title={diet.name} />
							<span id={diet.name} >{diet.name}</span>
						</CardDiet>
					))
				}
			</FilterContainer2>
		)
	}

	return ( <h3>No hay dietas</h3> )
}

const CardDiet = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding: 5px;
	margin: 10px;
	box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
	z-index: 1;
	cursor: pointer;
	transition: all 0.3s ease;
	color: ${COLORS.SECOND_GREEN};

	img{
		width: 30px;
	}

	span{
		margin: 0 5px;
		font-size: 1rem;
		text-transform: uppercase;
	}
	
	&:hover{
		background-color: rgba(204,204,204, 0.4);
		transform: scale(1.1);
	}
`

const FilterContainer = styled.div`
	width: 80%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	margin: 0 auto;
	img{
		margin: 5px;
		cursor: pointer;
	}
`

const FilterContainer2 = styled(FilterContainer)`
	width: 100%;
	justify-content: flex-start;
`

export default FilterComponent