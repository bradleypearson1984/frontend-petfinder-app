import { Link } from 'react-router-dom';



const Favorites = (props) => {
    const pets = props.favoritePets;
    console.log(props)
    return pets.map((pet) => (
      <div className='favoriteArea'>

        <div key={pet._id} className="favoritePetsContainer">
          {/* <div className="favoritePetRow"> */}
          
          <div className='favoritePetCard'>
          <Link to={`/pet/${pet.id}`} onClick = {()=> props.setSelectedPet(pet)} className="link" >
          <h3 className="favoriteName">{pet.name}</h3>
          <img className="favoritePic" src={pet.photos.length>0? pet.photos[0].small: ""} alt={pet.name} />
          <h4 className="favoriteAge">{pet.age}</h4>{"    "}
          <h4 className="favoriteGender"> {pet.gender}</h4>{"    "}
          <h4 className="favoriteBreeds" >{pet.breeds ? pet.breeds.primary:""}</h4> 

          </Link>
          <button className="deleteButton" onClick={() => props.deletePets(pet._id)}>Delete</button>
          </div>
          </div>
          
      </div>
        // </div>
      ))
    }

export default Favorites