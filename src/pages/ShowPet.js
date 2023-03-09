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
    <div className="showPetDiv">
      <h1 className="showPetName">{pet.name}</h1>

      <img className="showPic" src={pet.photos[0].medium} alt={pet.name} />
      <p className="showDescription" >{pet.description}</p>
      <p className="showBreed" >{pet.breed}</p>
      <p className="showAge" >{pet.age}</p>
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