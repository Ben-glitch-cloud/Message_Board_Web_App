import './Login.css' 
import axios from 'axios';  
import React, { useEffect, useState } from 'react'

function Login(props){   

    const [errorMessage, setErrorMessage] = useState('')   

    const [userNameError, setUserNameError] = useState('')

    const [showForm, setShowForm] = useState(true)

    function GetDetails(e){
        e.preventDefault()  
        const UserDetails = {UserName: e.target[0].value, Password: e.target[1].value}  
        if(UserDetails['UserName'].length === 0 && UserDetails['Password'].length !== 0){  
            setErrorMessage(errorMessage => errorMessage = 'Username has not been found.')
            return 
        } else if(UserDetails['Password'].length === 0 && UserDetails['UserName'].length !== 0){ 
            setErrorMessage(errorMessage => errorMessage = 'Password has not been found.')
            return 
        }   

        axios.get('/CheckUserDetails', {
            params: {
                UserName: UserDetails['UserName'], 
                Password: UserDetails['Password']
            }
        }).then((res) => {  
            res['data'] ?  GetMessageBord() : setErrorMessage(errorMessage => errorMessage = 'User Name or Password is incorrect.')
        }).catch((error) => {
            console.log(`Error: ${error}`)
        })
    }  

    function NewUser(e){ 
        e.preventDefault()
        axios.post('/Creating/User', {
            UserName: e.target[0].value, 
            Password: e.target[1].value
        }).then((res) => {
            res['data'] ? setUserNameError(userNameError => userNameError = 'Username has been added') : setUserNameError(userNameError => userNameError = 'Username Already existes')
        }).catch((error) => {
            console.log(`Error: ${error}`)
        })
    }

    function GetMessageBord(){  
        props.GetMessageBord()  
        // item saved
        localStorage.setItem("login", true) 
    } 

    function ChangeForm(){  
        setShowForm( showForm => !showForm)   
        setErrorMessage(errorMessage => errorMessage = '')
        setUserNameError(userNameError => userNameError = '')
    }

    return(
        <div className='Login'>  
            <div className='LoginFormCon'> 
                <p className='HeaderPage'>Mesasge Board</p> 
                <p className='LoginDescription'>Your own personal message board.</p> 
                { showForm ? 
                <div className='LoginFormItems'>   
                    <p className='LoginHeader'>Login</p> 
                    <p className='errorMessage'>{errorMessage}</p>
                    <form onSubmit={GetDetails}> 
                        <p className='UserName'>UserName</p>
                        <input type="text" name='Username'/>  
                        <p>Password</p>
                        <input type="text" name='Password'/>  
                        <p></p>
                        <input className='submitButton' type="submit" value={showForm ? 'LogIn' : 'LogIn'}/>
                    </form>
                </div> 
                :  
                <div className='LoginFormItems'>   
                    <p className='LoginHeader'>Sign Up</p> 
                    <p className='errorMessage'>{userNameError}</p>
                    <form onSubmit={NewUser}> 
                        <p className='UserName'>Create UserName</p>
                        <input type="text" name='Username'/>  
                        <p>Create Password</p>
                        <input type="text" name='Password'/>  
                        <p></p>
                        <input className='submitButtonCreateNewUser' type="submit" value={showForm ? 'LogIn' : 'Sign Up'}/>
                    </form>
                </div> 
                } 
                <button className='CreateUser' onClick={ChangeForm}>{showForm ? 'Sign Up' : 'Log In'}</button>
            </div>  
            <div className='LoginImage'></div>
        </div>
    )
} 

export default Login
