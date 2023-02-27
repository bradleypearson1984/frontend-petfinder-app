import React from 'react';

function DisplayPets({ animals }) {
  return (
    <div>
    <h1>Available Dogs</h1>
      <ul>
        {animals.map(animal => (
          <li key={animal.id}>
            <h2>{animal.name}</h2>
            <img src={animal.photos.length > 0 ? animal.photos[0].medium : ''} alt={animal.name} />
            <p>{animal.description}</p>
          </li>
        ))}
      </ul>
    </div>
    
  );
}

export default DisplayPets;
