import { useNavigate } from 'react-router-dom';

const ShowPet = (props) => {
  
  const navigate = useNavigate();
  const pet = props.selectedPet;

  const addToFavorites = () => {
    props.createPets(pet);
    document.getElementById("favorite-added").innerHTML = "Added to favorites"; 
    document.getElementById("favorites").disabled = true;
    setTimeout(function(){
      document.getElementById("favorite-added").innerHTML = "";
    }, 2000) };

 return (
  <div className='showContainer'>

    <div className='showPet'>
      <h1 className='showPetName'>{pet.name}</h1>

      <img className='showPic' src={pet.photos[0].medium} alt={pet.name} />
      <p>{pet.description}</p>
      <p>{pet.breed}</p>
      <p>{pet.age}</p>
      <p>{pet.gender}</p>
      <p>{pet.video}</p>
      <p>{pet.status}</p>
      <p>{pet.contact.email}</p>
      <p>{pet.contact.phone}</p>
       <div>
        <a href={pet.url}>
          <h3>Link to more information</h3>
        </a>
      <p>
        {pet.contact.address.address1} 
        {pet.contact.address.city},{" "} 
        {pet.contact.address.state}{" "}
        {pet.contact.address.postcode}{" "} 
        {pet.contact.address.country}
      </p>
       </div>
       <div id="favorite-added" style={{'color': 'blue'}}></div>
      <p><input
      type="submit" 
      id="favorites"
      value="Add to favorites" 
      onClick={addToFavorites} /></p>
      {/* add return to index button */}
      <p><input className='return' type="submit" value="Return to index" onClick={() =>navigate('/')} /></p>
      
    </div>
      </div>
  )
}

export default ShowPet