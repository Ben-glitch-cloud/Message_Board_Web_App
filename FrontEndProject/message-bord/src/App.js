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
  
  useEffect(() => {
    axios.get('/messages').then((res) => { 
      setMessages(messages => [...messages, ...res.data]) 
    }).catch(function (error){
      console.log(`Error: ${error}`)
    })
  }, [])  

  console.log('looking at chest')

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

  // make sure username and password are in a .env file before pushing to github:)

  // As a user I would like to edit my messages ones they are up.    

  //Creat the editing form. 

  //ones a user has edited the message send it to the database to be fixed.

  return ( 
    <div className="App">
      <Header/>  
      { editWindow ? <EditWindow SetEditMessage={editMessage} GetCloseEditWindow={GetCloseEditWindow}/> : null }
      <Form GetMessageData={GetMessageData}/>
      <div className='MessageCon'>
        {messages.map(item => {
          return <UserMessage id={item._id} message={item.UserMessage} date={item.Date} GetMessageID={GetMessageID} GetEditMessage={GetEditMessage}/>
        })}
      </div>
    </div>
  );
}

export default App;
