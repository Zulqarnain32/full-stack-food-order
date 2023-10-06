import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios"

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ error,setError ] = useState('')

  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', {email,password})
    .then((result) => {
      if(result.data.message == "user login "){
        window.localStorage.setItem("id",result.data.id)
        console.log(result);
        navigate('/foods')
        window.location.reload()
      }
      else if(result.data.message == "please fil all fields"){
          setError("Please fill all the fields")
      } else if(result.data.message == "email not found"){
        setError("Email not found")
      } else if(result.data.message == "incorrect password"){
        setError("incorrect password")
      }
    }).catch(err => console.log(err))
  };

  return (
    <div className='register-container'>
    <form className="form_main" onSubmit={handleSubmit}>
      <p className="heading">Login</p>

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
        <Link to = "/register" className='account'>Don't have an account </Link>
     </form>
    </div>
  );
}

export default Login;

