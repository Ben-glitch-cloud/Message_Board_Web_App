import './App.css'; 
import React, { useEffect, useState } from 'react' 
import axios from 'axios'; 
import UserMessage from './components/UserMessages/UserMessages'; 
import Header from './components/Header/Header' 
import Form from './components/Form/Form' 
import EditWindow from './components/EditWindow/EditWindow'; 
import Login from './components/Login/Login' 
import Filter from './components/Filter/Filter'; 
import UserProfile from './components/UserProfile/UserProfile';

function App() {  

  const [messages, setMessages] = useState([]) 

  const [editWindow, setEditWindow] = useState(false)  

  const [editMessage, setEditMesage] = useState([]) 

  const [login, setLogin] = useState(false) 

  const [userID, setUserID] = useState([])  

  const [userName, setUserName] = useState([])  

  const [userMessages, setUserMessages] = useState(0) 

  const [UserProfileShow, setUserProfileShow] = useState(false)

  // ['BenedictLawrence']

  useEffect(() => { 
    if(login) { 
      console.log('--Getting messages--') 
      setMessages(messages => messages = []) 
      setUserID(userID => userID = [])
      axios.get('/messages').then((res) => { 
        setMessages(messages => [...messages, ...res.data]) 
      }).catch(function (error){
        console.log(`Error: ${error}`)
      })   

      axios.get('/UserConfirmation').then((res) => {  
        setUserID(userID => [...userID, res.data['_id']])   
      }).catch(function (error) {
        console.log(`Error: ${error}`)
      })
    } 
  }, [login])    
  
  useEffect(() => {  setUserMessages(num => num = messages.filter((mes) => mes['UserIDMessage'] === userID[0]).length) }, [messages])

  useEffect(() => {  
    if(userName.length === 0){
      const profileUserName = localStorage.getItem('Username')
      setUserName(username => [...username, profileUserName])  
    }
   }, [])

  useEffect(() => {
    const LogedIn = localStorage.getItem('login') 
   if(LogedIn){setLogin(login => !login)}
  }, []) 

  function GetMessageData(e){ 
    setMessages(messages => [...messages, e]) 
    axios.post('/newMessage', {
      UserMessage: e['UserMessage'], 
      Date: e['Date']
    }).catch(function (error){
      console.log(`Error: ${error}`)
    })
  } 

  function GetMessageID(ID){  
    setMessages(messages => messages.filter((message) => message._id !== ID))
    axios.post('/deleteMessage', {
      id: ID
    }).catch(function (error){
      console.log(`Error: ${error}`)
    })
  } 

  function GetEditMessage(ID, message){
    console.log('edit', ID, message) 
    setEditWindow(editWindow => !editWindow) 
    setEditMesage(editMessage => [...editMessage, {_id: ID, UserMessage: message}]) 
  } 

  function GetCloseEditWindow(){
    setEditWindow(editWindow => !editWindow) 
    setEditMesage([])
  } 

  function ChangeEditMessage(EditedM){  
    setEditWindow(editWindow => !editWindow) 
    setEditMesage([])    
    setMessages(message => message.filter((mes) => mes['_id'] === EditedM['ID'] ? mes['UserMessage'] = EditedM['UserMessage'] : mes))
    axios.post('/EditMessage', {
      ID: EditedM['ID'], 
      UserMessage: EditedM['UserMessage']
    }).catch(function (error){
      console.log(`Error: ${error}`)
    }) 
    console.log(EditedM)
  } 

  // use this
  function GetMessageBord(Username){  
    setLogin(login => !login)  
    localStorage.setItem('Username', Username)   
    const profileUserName = localStorage.getItem('Username') 
    if(userName.length === 0){
      setUserName(username => [...username, profileUserName])  
    }

  } 

  function logout(){ 
    setLogin(login => !login) 
    localStorage.removeItem('login') 
    localStorage.removeItem('Username') 
    setUserName(userName => userName = []) 
  }   

  function ShowUserProfile(){
    console.log('click')  
    setUserProfileShow(UserProfileShow => !UserProfileShow)
    // work on the user window.
  }

  // Adding a user profile so as a user I can edit it.  
  //

  if(login) {
  return ( 
    <div className="App">  
      <Header LoggingOut={logout} ShowUserProfile={ShowUserProfile}/>   
      { UserProfileShow ? <UserProfile Username={userName} NumberOfMessages={userMessages}/> : null}
      { editWindow ? <EditWindow SetEditMessage={editMessage} GetCloseEditWindow={GetCloseEditWindow} ChangeEditMessage={ChangeEditMessage}/> : null }
      <Form GetMessageData={GetMessageData} CurrentUserID={userID[0]}/>  
      <div className='MessageCon'>
        {messages.map(item => {
          return <UserMessage id={item._id} message={item.UserMessage} MessageID={item.UserIDMessage} date={item.Date} GetMessageID={GetMessageID} GetEditMessage={GetEditMessage} CurrentUserID={userID[0]}/>
        })}
      </div>  
    </div>
  ); 
  } else {
  return(
        <Login GetMessageBord={GetMessageBord}/>
        )
  }
}

export default App;
