import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ShowPet = (props) => {
  
  const navigate = useNavigate();



  const pet = props.selectedPet;

  //alter just the pet.description using 
  const removeSpecChar = (props) => {
    if (props === null || props === undefined) {
      return "";
    }
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
    // add new text next to button saying "Added to favorites" and then make a button that navigates to index page
    document.getElementById("favorite-added").innerHTML = "Added to favorites"; 
    // disable the button 
    document.getElementById("favorites").disabled = true;
    // wait 2 seconds and then remove the text and replace it with a button
    setTimeout(function(){
      document.getElementById("favorite-added").innerHTML = "";
    }, 2000);



    // create a button that navigates to index page in the favorite-added div

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
        {/* url link */}
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
      <p><input type="submit" value="Return to index" onClick={() =>navigate('/')} /></p>
      
    </div>
  )
}

export default ShowPet