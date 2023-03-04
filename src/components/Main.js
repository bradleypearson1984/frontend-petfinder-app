import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DisplayPets from './DisplayPets';

const API_KEY = '1gxzT4jdmq165biOL7wNCuaBLtaS7NMyZNIWgcTXLTodwgTQQ8';
const API_SECRET = 'K5Q3ZyDtiOrnn0cBysnVbHjFmatf42GWFupoAhQv';
const AUTH_ENDPOINT = 'https://api.petfinder.com/v2/oauth2/token';
const API_ENDPOINT = 'https://api.petfinder.com/v2';

function Main() {
  const [animals, setAnimals] = useState([]);
  const [animalType, setAnimalType] = useState('dog');

  const handleAnimalTypeChange = (event) => {
    setAnimalType(event.target.value);
  };

  useEffect(() => {
    let token;
    axios.post(AUTH_ENDPOINT, {
      grant_type: 'client_credentials',
      client_id: API_KEY,
      client_secret: API_SECRET
    })
      .then(response => {
        token = response.data.access_token;
        return axios.get(`${API_ENDPOINT}/animals?type=${animalType}&page=1`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
      .then(response => {
        console.log("animals", response.data.animals)
        //filter out animals without photos or videos or descriptions
        let filteredAnimals = response.data.animals.filter(animal => animal.photos.length > 0 );

        setAnimals(filteredAnimals.slice(0, 9));
      })
      .catch(error => {
        console.error(error);
      });
  }, [animalType]);

  return (
    <div>
      <div>
        <input
          type="radio"
          id="dog"
          name="animal-type"
          value="dog"
          checked={animalType === 'dog'}
          onChange={handleAnimalTypeChange}
        />
        <label htmlFor="dog">Dog</label>
        <input
          type="radio"
          id="cat"
          name="animal-type"
          value="cat"
          checked={animalType === 'cat'}
          onChange={handleAnimalTypeChange}
        />
        <label htmlFor="cat">Cat</label>
        <input
          type="radio"
          id="rabbit"
          name="animal-type"
          value="rabbit"
          checked={animalType === 'rabbit'}
          onChange={handleAnimalTypeChange}
        />
        <label htmlFor="rabbit">Rabbit</label>
      </div>
      <DisplayPets animalType ={animalType} animals={animals} />
    </div>
  );
}

export default Main;
