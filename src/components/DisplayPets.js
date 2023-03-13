import React from 'react';
import { Link } from 'react-router-dom';

function DisplayPets({ animals, animalType, selectedPet, setSelectedPet }) {


  return (
    <div className="displayPetDiv" >
    <h1 className="available" >Available {animalType}s </h1>
      <ul  >
        {animals.map(animal => (
          
          <li className="indexCard" key={animal.id}>
            <Link to={`/pet/${animal.id}`} onClick = {()=> setSelectedPet(animal)}>
            <h2 className="petName"  >{animal.name}</h2>

            <img className="pic" src={animal.photos.length > 0 ? animal.photos[0].medium : ''} alt={animal.name} />
            </Link>
            <p className="indexAge" >{animal.age}</p>
            <p className="indexLocation" >{animal.contact.address.city}, {animal.contact.address.state} </p>


          </li>
          
          
        ))}
      </ul>
    </div>
    
  );
}

export default DisplayPets;