import axios from 'axios';
import React, { useEffect, useCallback, useState } from 'react';
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
 

    const [zipcode, setZipcode] = useState('');
    const [isZipcodeProvided, setIsZipcodeProvided] = useState(false);
  
    const handleZipcodeChange = (event) => {
      setZipcode(event.target.value);
    };
  
    const handleZipcodeSubmit = (event) => {
      event.preventDefault();
      if (/^\d{5}$/.test(zipcode)) {
        setIsZipcodeProvided(true);
      } else {
        alert('Please enter a valid 5-digit zipcode.');
      }
    };
    

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
        return axios.get(`${API_ENDPOINT}/animals?type=${animalType}&location=${zipcode}&page=1`, {
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
  }, [animalType, setAnimals, zipcode]);

  useEffect(() => {
    if (isZipcodeProvided) {
      handleGetAnimals();
    }
  }, [zipcode, animalType, handleGetAnimals, isZipcodeProvided]);
  

  
    

  return (
    <div>
      <div className='location-search' >

      <form onSubmit={handleZipcodeSubmit}>
        <label htmlFor="zipcode">Zipcode:</label>
        <input type="text" id="zipcode" name="zipcode" value={zipcode} onChange={handleZipcodeChange} />
        <button type="submit" >Search</button>
      </form>
      </div>
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