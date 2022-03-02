import './App.css'; 
import React, { useEffect, useState } from 'react' 
import axios from 'axios'; 
import UserMessage from './components/UserMessages/UserMessages'; 
import Header from './components/Header/Header' 
import Form from './components/Form/Form' 
import EditWindow from './components/EditWindow/EditWindow';

function App() {  

  const [messages, setMessages] = useState([]) 

  const [editWindow, setEditWindow] = useState(false)  

  const [editMessage, setEditMesage] = useState([]) 

  const [login, setLogin] = useState(true)
  
  useEffect(() => { 

    axios.get('/messages').then((res) => { 
      setMessages(messages => [...messages, ...res.data]) 
    }).catch(function (error){
      console.log(`Error: ${error}`)
    }) 

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

  // 1. Creat a login page 

  // 2. Creat a database with a collaction of usernames and passwords (add a User statuse to the app)
  
  // 3. Start looking at online deplayment

  if(login) {
  return ( 
    <div className="App">  
      <Header/>  
      { editWindow ? <EditWindow SetEditMessage={editMessage} GetCloseEditWindow={GetCloseEditWindow} ChangeEditMessage={ChangeEditMessage}/> : null }
      <Form GetMessageData={GetMessageData}/>
      <div className='MessageCon'>
        {messages.map(item => {
          return <UserMessage id={item._id} message={item.UserMessage} date={item.Date} GetMessageID={GetMessageID} GetEditMessage={GetEditMessage}/>
        })}
      </div>  
    </div>
  ); 
  } else {
  return(
        <div>
          <p>Hello world</p>
        </div>
        )
  }


}

export default App;
