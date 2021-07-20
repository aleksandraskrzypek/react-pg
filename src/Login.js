import React from 'react'
import { useState} from "react"
import "./login.css"
import { useHistory } from 'react-router-dom'
import axios from "axios"


export let token2 = ''

function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const [token, setToken] = useState('');
    
    token2 = token;

    let history=useHistory();

    function handleCreateButton() {
        history.push("/newAccount");
    }


    const handleSubmit = () => {

        axios.post('https://recruitment.ultimate.systems/auth/local',{
            identifier: identifier,
            password: password
        })
        .then(function (response) {
          console.log(response);
          console.log(response.status);
          console.log(response.request.response);
        
          setToken(JSON.parse(response.request.response).jwt)


         // console.log(token)

          history.push("/todoList")
        })
        .catch(function (error) {
          console.log(error);
        });
      }


     // console.log({token2})

    return (
        <div className="login-panel">
            <div className="title">
                <p>Login</p>
            </div>

            <div className="inputs">
                <div className="username">
                    
                        <input
                            value={identifier} 
                            className="input-username"
                            type="text"
                            name="emailOrUsername" 
                            placeholder="Email or Username" 
                            onChange={e => setIdentifier(e.target.value)}
                        />
                    
                </div>
                <div className="password">
                   
                        <input
                            value={password} 
                            className="input-password"
                            type="password"
                            name="emailOrUsername" 
                            placeholder="Password" 
                            onChange={e => setPassword(e.target.value)}
                        />
                    
                </div>
            </div>

            <div className="login-button">
                <button type="button" onClick={handleSubmit}>Login</button>
            </div>

            <div className="or">
                <p>or</p>
            </div>

            <div className="create" onClick={handleCreateButton}>
                <p>create an account</p>
            </div>

    
        
        </div>
    )
}

export default Login

