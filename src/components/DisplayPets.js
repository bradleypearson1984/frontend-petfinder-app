import React from 'react';
import { Link } from 'react-router-dom';

function DisplayPets({ animals, animalType, selectedPet, setSelectedPet }) {


  return (
    <div className="displayPetDiv" >
    <h1 className="available" >Available {animalType}s </h1>
      <ul  >
        {animals.map(animal => (
          
          <li className="indexCard" key={animal.id}>
            <Link to={`/pet/${animal.name}`} onClick = {()=> setSelectedPet(animal)}>
            <h2 className="petName"  >{animal.name}</h2>

            <img className="pic" src={animal.photos.length > 0 ? animal.photos[0].medium : ''} alt={animal.name} />
            </Link>
            <p className="indexDescription" >{animal.description}</p>

          </li>
          
        ))}
      </ul>
    </div>
    
  );
}

export default DisplayPets;
