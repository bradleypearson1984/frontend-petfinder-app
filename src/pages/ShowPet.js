import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ShowPet = (props) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const pets = props.animals;
  const pet = pets ? pets.find((p) => p._id === id) : null;

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
    <div>
      <h1>{pet.name}</h1>
    </div>
  )
}

export default ShowPet