import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DisplayPets from './../components/DisplayPets';

const API_KEY = '1gxzT4jdmq165biOL7wNCuaBLtaS7NMyZNIWgcTXLTodwgTQQ8';
const API_SECRET = 'K5Q3ZyDtiOrnn0cBysnVbHjFmatf42GWFupoAhQv';
const AUTH_ENDPOINT = 'https://api.petfinder.com/v2/oauth2/token';
const API_ENDPOINT = 'https://api.petfinder.com/v2';

function Index({ 
  animals, 
  setAnimals, 
  animalType, 
  setAnimalType, selectedPet, 
  setSelectedPet, getPets, removeSpecChar,
  favoritePets, deletePets, saveAnimalsData, dbAnimals, getAnimalsData }) {
 


  useEffect(() => {
    getPets();
    getAnimalsData();
  }, []);
 

  
  const loadFavePets = () => {
    if (favoritePets.length > 0) {
    return favoritePets.map((pet) => (
      <div key={pet._id} className="favoritePetsContainer">
        <div className="favoritePetRow">
        
        <div className='favoritePetCard'>
        <Link to={`/pet/${pet.id}`} onClick = {()=> setSelectedPet(pet)}>
        <h3 className="">{pet.name}</h3>
        <img className="" src={pet.photos.length>0? pet.photos[0].small: ""} alt={pet.name} />
        <h4 className=''>{pet.age}</h4>{"    "}
        <h4>{pet.gender}</h4>{"    "}
        <h4>{pet.breeds ? pet.breeds.primary:""}</h4> 
        </Link>
        <button className="deleteButton" onClick={() => deletePets(pet._id)}>Delete</button>
        </div>
        </div>
        
      </div>
    )
  )} else {
    return (
    <div className='favoritePetsContainer'><h3>No favorite pets to display...Add some favorites!</h3></div>)}}

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
        //filter out animals without photos and use removeSpecChar function to remove special characters
         let filteredAnimals = response.data.animals.filter(animal => animal.photos.length > 0 );
       
        filteredAnimals.forEach(animal => {
          animal.name = removeSpecChar(animal.name);
          animal.description = removeSpecChar(animal.description);  
        })


        setAnimals(filteredAnimals.slice(0, 19));
       
        // returns a promise, so we can chain another .then() to it
        saveAnimalsData(filteredAnimals.slice(0, 19));

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
      <div>
        <button onClick={()=>getPets()}>Get Pets</button>
      </div>
      <div>
        {console.log("favoritePets", favoritePets)}
      {loadFavePets()}

      </div>
      <DisplayPets deletePets={deletePets} dbAnimals= {dbAnimals} animalType ={animalType} animals={animals} selectedPet={selectedPet} setSelectedPet={setSelectedPet} />
      <div>
        <button onClick={()=>getAnimalsData()}>Get Pets from the Database</button>
      </div>
    </div>
  );
}

export default Index;