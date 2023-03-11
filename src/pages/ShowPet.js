import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ShowPet = (props) => {
  const navigate = useNavigate();
  



  const pet = props.selectedPet;




  const handleChange = () => {
    props.createPets(pet);
    console.log("This pet's contact info has been saved to MongoDB:", pet )
  };

return (
    <div className='showPet'>
      <h1 className='showPetName'>{pet.name}</h1>

      <img src={pet.photos[0].medium} alt={pet.name} />
      <p>{pet.description}</p>
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
        {pet.contact.address.city}
        {pet.contact.address.state}
        {pet.contact.address.postcode}
        {pet.contact.address.country}
      </p>
       </div>
      


      <p><input
      type="submit" 
      id="favorites" 
      onClick={handleChange} /></p>
      
    </div>
  )
}

export default ShowPet