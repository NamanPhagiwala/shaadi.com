import React, { useState } from 'react';
import './login.scss'
import { Link , useNavigate} from 'react-router-dom';

const Login= (props)=>{
    const [userName, updateUserName] = useState('');
    const [password, updatePassword] = useState('');
    const [incorrectDetails, updateStatus] = useState(false);
    const [errorMsg, updateError] = useState('');

    let navigate= useNavigate()

const updateField=(e, field)=>{
    if(field==='username'){
        updateUserName(e.target.value)
    }
    else if(field==='password'){
        updatePassword(e.target.value)
    }
}

const verifyUser=()=>{
    if(userName.toLowerCase() === 'foo'){
        if(password.toLowerCase() ==='bar'){
            navigate('/home')
            updateStatus(false)
            localStorage.setItem('loggedIn', true)
        }
        else{
            updateError('Incorrect Password')
            updateStatus(true)
        }
    }
    else{
        updateError('Incorrect UserName')
        updateStatus(true)
    }
}
return(
        <div class="login">  
               <h1 className='title'> Assignment<sub> By Naman Phagiwala</sub></h1>
               <div className='main'> 
                    <input type='text' onChange={(e)=>updateField(e, 'username')} placeholder='Enter Username' className="form"/><br/>
                    <input type='password' onChange={(e)=>updateField(e, 'password')} placeholder='Enter Password' className="form"/><br/>
                    {incorrectDetails && <span style={{color: 'red'}}> {errorMsg} </span>}
                    <button onClick={verifyUser} className='submit'> Login</button>
            </div>   
      </div>  
    );
}
export default Login;
