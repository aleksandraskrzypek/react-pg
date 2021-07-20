import React from 'react'
import { useState} from "react"
import "./NewAccount.css"
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import axios from "axios"
import { useHistory } from 'react-router-dom'



function NewAccount() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const handleSubmit = () => {

      axios.post('https://recruitment.ultimate.systems/auth/local/register',{
        username: username,
        email: email,
        password: password
      })
      .then(function (response) {
        console.log(response);
        console.log(username, email, password)
        history.push("/")
      })
      .catch(function (error) {
        console.log(error);
        console.log(username, email, password)
      });
    }

    let history=useHistory();

    function returnButton() {
        history.push("/");
    }
 
    return (
        <div className="registration">
            <div className="arrow">
                <ArrowBackIcon onClick={returnButton}/>
            </div>

            <div className="create-text">
                <p>Create an new account</p>
            </div>

            <div className="inputs-newAccount">
                    
                        
                        <input
                            value={username} 
                            className="input-username-newAccount"
                            type="text"
                            name="username" 
                            placeholder="Username" 
                            onChange={e => setUsername(e.target.value)}
                        />
                        <input
                            value={email} 
                            className="input-email-newAccount"
                            type="text"
                            name="email" 
                            placeholder="Email" 
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            value={password} 
                            className="input-password-newAccount"
                            type="password"
                            name="password" 
                            placeholder="Password" 
                            onChange={e => setPassword(e.target.value)}
                        />
                        <input
                            value={password} 
                            className="input-re-password-newAccount"
                            type="password"
                            name="rePassword-newAccount" 
                            placeholder="Repeat password" 
                            onChange={e => setPassword(e.target.value)}
                        />


        <button type="button" onClick={handleSubmit} className="create-button"><p>Create</p></button>
     
                

            </div>
        </div>
)
}

export default NewAccount