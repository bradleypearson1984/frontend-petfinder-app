import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ShowPet = (props) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const pet = props.selectedPet;


  const [comment, addComment] = useState({
    comment: "",
  });

  // comment feature needs option to edit and delete comment too

  const handleChange = (event) => {
    addComment((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    props.updatePetComment(comment, pet._id);
  };

  const handleDeleteComment = () => {
    props.deletePetComment(pet._id);
    navigate("/");
  };

  const handleDeletePet = () => {
    props.deletePet(pet._id);
    navigate("/");
  };

return (
    <div class='showPet'>
      <h1 class='showPetName'>{pet.name}</h1>

      <img src={pet.photos[0].medium} alt={pet.name} />
      <p>{pet.description}</p>
      <p>{pet.breed}</p>
      <p>{pet.age}</p>
{/* {user ? (
  //LOGGED IN VERSION
  <li>
  <button onClick={logout}>Logout</button>
</li>
 ); (
  //LOGGED OUT VERSION 
  <li>
  <button onClick={login}>Login</button>
</li>
)} */}
{/* 
{user ? (
        <>
            
            <li>
                <button>logged in</button>
               </li>
            
        </>
    ) : (
        <li>
            <button>Logged out</button>
        </li>
    )} */}
    </div>
  )
}; 

export default ShowPet