import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';








const ShowPet = (props) => {
  const navigate = useNavigate();
  const {id} = useParams();
  



  return (
    <div>ShowPet</div>
  )
}

export default ShowPet