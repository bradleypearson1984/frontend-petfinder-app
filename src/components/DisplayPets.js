import React from 'react';
import { Link } from 'react-router-dom';

function DisplayPets({ animals, animalType }) {
  return (
    <div>
    <h1>Available {animalType}s </h1>
      <ul>
        {animals.map(animal => (
          
          <li key={animal.id}>
            <Link to={`/favoritepets/${animal.id}`}>
            <h2>{animal.name}</h2>

            <img src={animal.photos.length > 0 ? animal.photos[0].medium : ''} alt={animal.name} />
            </Link>
            <p>{animal.description}</p>

          </li>
          
        ))}
      </ul>
    </div>
    
  );
}

export default DisplayPets;
