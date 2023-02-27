import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DisplayPets from './components/DisplayPets';

const API_KEY = '1gxzT4jdmq165biOL7wNCuaBLtaS7NMyZNIWgcTXLTodwgTQQ8';
const API_SECRET = 'K5Q3ZyDtiOrnn0cBysnVbHjFmatf42GWFupoAhQv';
const AUTH_ENDPOINT = 'https://api.petfinder.com/v2/oauth2/token';
const API_ENDPOINT = 'https://api.petfinder.com/v2';

function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    let token;
    axios.post(AUTH_ENDPOINT, {
      grant_type: 'client_credentials',
      client_id: API_KEY,
      client_secret: API_SECRET
    })
      .then(response => {
        token = response.data.access_token;
        return axios.get(`${API_ENDPOINT}/animals?type=dog&page=1`, {
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
  }, []);

  return (
    <div className="App">
      <DisplayPets animals={animals} />
    </div>
  );
}

export default App;
