import React from 'react';
import { Link } from 'react-router-dom';

function DisplayPets({dbAnimals, animals, animalType, selectedPet, setSelectedPet, deletePets }) {

  return (
    <>
    <div className="displayPetDiv">
      <h1 className="available">Available {animalType}s</h1>
      <ul>
        {animals.map(animal => (
          <li className="indexCard" key={animal._id}>
            <Link to={`/pet/${animal.id}`} onClick = {()=> setSelectedPet(animal)}>
              <h2 className="petName">{animal.name}</h2>
              <img className="pic" src={animal.photos.length > 0 ? animal.photos[0].medium : ''} alt={animal.name} />
            </Link>
            <p className="indexAge">{animal.age}</p>
            <p className="indexLocation">{animal.contact.address.city}, {animal.contact.address.state}</p>
          </li>
        ))}
      </ul>
    </div>

    <div className="displayPetDiv">
      <h1 className="available">Database Animals</h1>
      <ul>
        {dbAnimals.map(dbAnimal => (
          <li className="indexCard" key={dbAnimal._id}>
            <Link className="petLink" to={`/pet/${dbAnimal.id}`} onClick = {()=> setSelectedPet(dbAnimal)}>
              <h2 className="petName">{dbAnimal.name}</h2>
              <img className="pic" src={dbAnimal.photos.length > 0 ? dbAnimal.photos[0].medium : ''} alt={dbAnimal.name} />
            </Link>
            {/* published_at transformed into MM-DD-YYYY */}
            <p className="indexAge">{dbAnimal.published_at.slice(5,7) + "-" + dbAnimal.published_at.slice(8,10) + "-" + dbAnimal.published_at.slice(0,4)}</p>
            <p className="indexAge">{dbAnimal.age}</p>
            <p className="indexLocation">{dbAnimal.contact.address.city}, {dbAnimal.contact.address.state}</p>
            

          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default DisplayPets;