import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ShowPet = (props) => {
  const navigate = useNavigate();
  



  const pet = props.selectedPet;

  //alter just the pet.description using 
  const removeSpecChar = (props) => {
    let result = props
      .replace(/&quot;/g, "''")
      .replace(/&#039;/g, "'")
      .replace(/&shy;/g, "-")
      .replace(/&amp;/g, "&")
      .replace(/&Iacute;/g, "í")
      .replace(/&uuml;/g, "ü")
      .replace(/&rsquo;/g, "’")
      .replace(/&eacute;/g, "é")
      .replace(/&Uuml;/g, "Ü");

    return result;
  };



  const addToFavorites = () => {
    props.createPets(pet);
    console.log("This pet's contact info has been saved to MongoDB:", pet )
    console.log(pet._id)
  };

  const deleteFromFavorites = () => {
    props.deletePets(pet);
    console.log("This pet's contact info has been deleted from MongoDB:", pet )
    console.log(pet._id)
  };

return (
    <div className='showPet'>
      <h1 className='showPetName'>{pet.name}</h1>

      <img src={pet.photos[0].medium} alt={pet.name} />
      <p>{removeSpecChar(pet.description)}</p>
      <p>{pet.breed}</p>
      <p>{pet.age}</p>
      <p>{pet.gender}</p>
      <p>{pet.video}</p>
      <p>{pet.status}</p>
      <p>{pet.contact.email}</p>
      <p>{pet.contact.phone}</p>
       <div>
      <p>
        {pet.contact.address.address1} 
        {pet.contact.address.city}, 
        {pet.contact.address.state}{" "}
        {pet.contact.address.postcode}{" "} 
        {pet.contact.address.country}
      </p>
       </div>

      <p><input
      type="submit" 
      id="favorites"
      value="Add to favorites" 
      onClick={addToFavorites} /></p>
      <p><input
      type="submit" 
      id="deletes"
      value="Delete from favorites" 
      onClick={deleteFromFavorites} /></p>
      
    </div>
  )
}

export default ShowPet