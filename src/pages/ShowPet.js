import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Main from '../components/Main';

const ShowPet = (props) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const pet = props.selectedPet;


  // const [comment, addComment] = useState({
  //   comment: "",
  // });
  // comment feature needs option to edit and delete comment too

  const [favorite, addFavorite] = useState({},
    console.log(pet),
    console.log(id)
  );

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   props.createPets(favorite);
  //   addFavorite({
  //     animals: {
  //       name: ""
  //     }
  //   })
  // };

  const createPets = async (favoritePet) => {
    try {
      if(user) {
        const token = await user.getIdToken();
        await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(favoritePet),
        });
        getPets();
      }
     
    } catch (error) {
    }
  }

  // const handleUpdate = (event) => {
  //   event.preventDefault();
  //   props.updatePetComment(comment, pet._id);
  // };

  // const handleDeleteComment = () => {
  //   props.deletePetComment(pet._id);
  //   navigate("/");
  // };

  // const handleDeletePet = () => {
  //   props.deletePet(pet._id);
  //   navigate("/");
  // };

  // const handleFavorite = () => {
  //   console.log(props.selectedPet)
  // }

return (
    <div class='showPet'>
      <h1 class='showPetName'>{pet.name}</h1>

      <img src={pet.photos[0].medium} alt={pet.name} />
      <p>{pet.description}</p>
      <p>{pet.breed}</p>
      <p>{pet.age}</p>
      <p>{pet.gender}</p>
      <p>{pet.video}</p>
      <p>{pet.status}</p>
      <p>{pet.contact.email}</p>
      <p>{pet.contact.phone}</p>
       <div>
      <p>
        {pet.contact.address.address1} 
        {pet.contact.address.city}
        {pet.contact.address.state}
        {pet.contact.address.postcode}
        {pet.contact.address.country}
      </p>
       </div>
      


      <p><input
      type="submit" 
      id="favorites" 
      value="Add to favorites"
      onClick={createPets} /></p>
      
    </div>
  )
}

export default ShowPet