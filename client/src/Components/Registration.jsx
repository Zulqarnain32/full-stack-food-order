import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios"

const Registration = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword]  = useState('');
  const [ error,setError ] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', {name,email,password})
    .then((result) => {
      if(result.data.message == "user register successfully"){
        console.log(result);
        navigate('/login')
      }
      else if(result.data.message == "please fil all fields"){
          setError("Please fill all the fields")
      } else if(result.data.message == "email already exist"){
        setError("Email already exist")
      }
    }).catch(err => console.log(err))
  };

  return (
    <div className='register-container'>
    <form className="form_main" onSubmit={handleSubmit}>
      <p className="heading">Sign Up</p>

      <div className="inputContainer">
      
        <input
          type="text"
          className="inputField"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="inputContainer">
      
        <input
          type="text"
          className="inputField"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="inputContainer">
        <input
          type="password"
          className="inputField"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
       <p className="error">{error}</p>
      <button type="submit" className='button'>Submit</button>
        <Link to = "/login" className='account'>Already have an account </Link>
     </form>
    </div>
  );
}

export default Registration;

