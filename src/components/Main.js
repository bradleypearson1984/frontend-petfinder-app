import { useEffect, useState } from "react";
import {Routes, Route} from "react-router-dom";
import Index from "../pages/Index";
import ShowPet from "../pages/ShowPet";



const Main = () => {
  const [favoritePets, setFavoritePets] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [animalType, setAnimalType] = useState('dog');
  const [selectedPet, setSelectedPet] = useState({});
  //const API_URL = "http://localhost:3001/favoritepets";



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
        />} />
        <Route path="/pet/:id"  element={<ShowPet animals={animals} selectedPet={selectedPet} />} />
      </Routes>
    </main>
  )
}

export default Main