import axios from 'axios';
import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DisplayPets from './../components/DisplayPets';

const API_KEY = 'baDs8oID8IQUpYQra2skjNjP61EYh11AjnR8WgbuW0rl1bS611';
const API_SECRET = 'KvPewNgFx2D8PXJMnI2ppPGanvqPNS2oP4trSHtj';
const AUTH_ENDPOINT = 'https://api.petfinder.com/v2/oauth2/token';
const API_ENDPOINT = 'https://api.petfinder.com/v2';

function Index({ 
  animals, 
  setAnimals, 
  animalType, 
  setAnimalType, selectedPet, 
  setSelectedPet, getPets, removeSpecChar,
  deletePets, saveAnimalsData, dbAnimals, getAnimalsData }) {
 



  const handleAnimalTypeChange = (event) => {
    setAnimalType(event.target.value);
  };

  const handleGetAnimals = useCallback(() => {
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
        //filter out animals without photos and use removeSpecChar function to remove special characters
         let filteredAnimals = response.data.animals.filter(animal => animal.photos.length > 0 );
       
        // filteredAnimals.forEach(animal => {
        //   animal.name = removeSpecChar(animal.name);
        //   animal.description = removeSpecChar(animal.description);  
        // })


        setAnimals(filteredAnimals.slice(0, 19));
       
        
        // saveAnimalsData(filteredAnimals.slice(0, 19));

      })
      .catch(error => {
        console.error(error);
      });
  }, [animalType, setAnimals]);

  useEffect(() => {
    handleGetAnimals();
  }, [handleGetAnimals]);

  
    

  return (
    <div>
      <div className='animals-button'>
        <input className='dog-button'
          type="radio"
          id="dog"
          name="animal-type"
          value="dog"
          checked={animalType === 'dog'}
          onChange={handleAnimalTypeChange}
        />
        <label htmlFor="dog">Dog</label>
        <input className='cat-button'
          type="radio"
          id="cat"
          name="animal-type"
          value="cat"
          checked={animalType === 'cat'}
          onChange={handleAnimalTypeChange}
        />
        <label htmlFor="cat">Cat</label>
        <input className='rabbit-button'
          type="radio"
          id="rabbit"
          name="animal-type"
          value="rabbit"
          checked={animalType === 'rabbit'}
          onChange={handleAnimalTypeChange}
        />
        <label htmlFor="rabbit">Rabbit</label>
        
       <Link to='/favorites' className='favorites-link' onClick={()=>getPets()}>
            <div className="favorites">View Favorites</div>
        </Link>
      </div>
      
      <div className='display-pet-div'>
      <DisplayPets deletePets={deletePets} dbAnimals= {dbAnimals} animalType ={animalType} animals={animals} selectedPet={selectedPet} setSelectedPet={setSelectedPet} />
      </div>
        <button onClick={()=>getAnimalsData()}>Get Pets from the Database</button>
      </div>

   
  );
}

export default Index;