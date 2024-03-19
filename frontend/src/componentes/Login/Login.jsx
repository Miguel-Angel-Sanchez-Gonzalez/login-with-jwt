import React, { useState } from 'react';
import './Login.css';
import Home from '../Home/Home';

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loginSuccesfull, setloginSuccesfull] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password
    };
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {

        console.log(result.token);

        if(result.token){
          localStorage.setItem('token', result.token)
          setloginSuccesfull(true);
        }else{
          alert('Contraseña o usuario incorrecto')
          setloginSuccesfull(false);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <>{loginSuccesfull ? <Home />: <div className='login-container'>
      <form className="login-form">
        <label className="login-label">Username</label>
        <input onChange={(event) => {setUsername(event.target.value)}} className="login-input" type="text" />
        <label className="login-label">Password</label>
        <input onChange={(event) => {setPassword(event.target.value)}} className="login-input" type="password" />
        <button className="login-button" onClick={handleLogin}>Login</button>
      </form>
    </div>}</>
  );
  }  

export default Login;
