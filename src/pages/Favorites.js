import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Favorites = (props) => {
    const navigate = useNavigate();
    const pets = props.favoritePets;
    console.log("Favorites called", pets)
    return pets.map((pet) => (
        <div key={pet._id} className="favoritePetsContainer">
          <div className="favoritePetRow">
          
          <div className='favoritePetCard'>
          <Link to={`/pet/${pet.id}`} onClick = {()=> props.setSelectedPet(pet)}>
          <h3 className="">{pet.name}</h3>
          <img className="" src={pet.photos.length>0? pet.photos[0].small: ""} alt={pet.name} />
          <h4 className=''>{pet.age}</h4>{"    "}
          <h4>{pet.gender}</h4>{"    "}
          <h4>{pet.breeds ? pet.breeds.primary:""}</h4> 
          </Link>
          <button className="deleteButton" onClick={() => props.deletePets(pet._id)}>Delete</button>
          </div>
          </div>
          
        </div>
      ))
    }

export default Favorites