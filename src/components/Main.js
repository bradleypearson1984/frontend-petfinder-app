import { useEffect, useState, useRef } from "react";
import {Routes, Route} from "react-router-dom";
import Index from "../pages/Index";
import ShowPet from "../pages/ShowPet";



const Main = ({user}) => {
  const [favoritePets, setFavoritePets] = useState([]); // returns from mongoDB
  const [animals, setAnimals] = useState([]);
  const [animalType, setAnimalType] = useState('dog');
  const [selectedPet, setSelectedPet] = useState({});
  const API_URL = "http://localhost:5001/petFinder";
  const [favorite, addFavorite] = useState({ // sends to mongoDB
    pet: {
      name: "",
      photo: "",
      age: "",
      description: "",
      breed: "",
      gender: "",
      status: "",
    },
      contact: {
        email: "",
        phone: "",
        address: {
          address1: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
        },
      },
    },
  );
 

  const getPets = async () => {

    try {
      let token;
      if(user) {
        token = await user.getIdToken();
        console.log("token",token)
      
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
  
      });
      console.log(response)
      const data = await response.json();
      setFavoritePets(data);
    }
    } catch (error) {
      console.log("error", error)
    }
  }


  const createPets = async (favorite) => {
    try {
      if(user) {
        const token = await user.getIdToken();
        await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(favorite),
        });
        getPets();
      }
     
    } catch (error) {
    }
  }
  const deletePets = async (id) => {
    try {
      if(user) {
        const token = await user.getIdToken();
        await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'Application/json',
          }
        });
        getPets();
      }
    } catch (error) {
      console.log("error", error)
    }
  }


// invoke useRef hook to create a ref
// create the mutable ref object and assign it to the current property
  const getPetsRef = useRef(); // {current: null}

  useEffect(() => {
    getPetsRef.current = getPets;
    // set the mutable ref to the object that needs to persist across renders
  },[])



  useEffect(() => {
    if(user) {
      getPetsRef.current();
    } else {
      setFavoritePets(null)
    }

    
  }, [user]);





  return (
    <main>
      <Routes>
        <Route path="/" 
        element={<Index animals ={animals} 
        setAnimals={setAnimals} 
        animalType={animalType} 
        setAnimalType={setAnimalType} 
        selectedPet={selectedPet}
        setSelectedPet={setSelectedPet}
        getPets={getPets}
        user = {user}
        favoritePets={favoritePets}
        />} />
        <Route path="/pet/:id"  element={<ShowPet animals={animals} selectedPet={selectedPet} />} />
      </Routes>
    </main>
  )
}

export default Main