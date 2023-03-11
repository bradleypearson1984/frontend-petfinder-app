import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ShowPet = (props) => {
  const navigate = useNavigate();
  const {id} = useParams();



  const pet = props.selectedPet;


  // const [comment, addComment] = useState({
  //   comment: "",
  // });
  // comment feature needs option to edit and delete comment too

  


  const handleChange = (event) => {
    props.addFavorite((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
props.createPets(props.favorite);
// link back to index page
navigate("/");

  };

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
    <div className='showPet'>
      <h1 className='showPetName'>{pet.name}</h1>

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
      onClick={handleChange} /></p>
      
    </div>
  )
}

export default ShowPet