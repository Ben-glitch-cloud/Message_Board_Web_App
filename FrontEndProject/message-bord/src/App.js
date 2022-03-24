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
  // set login back to false
  const [login, setLogin] = useState(false) 
  const [userID, setUserID] = useState([])  
  const [userName, setUserName] = useState('')  
  const [userMessages, setUserMessages] = useState(0) 
  const [UserProfileShow, setUserProfileShow] = useState(false)

  const [FirstLick, setFirstLick] = useState(false)

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
      setUserName(username => username = profileUserName)  
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
      Date: e['Date'], 
      Likes: e['Likes'], 
      UserLiked: e['UserLiked']
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

  function GetMessageBord(Username){  
    setLogin(login => !login)  
    localStorage.setItem('Username', Username)   
    const profileUserName = localStorage.getItem('Username') 
    if(userName.length === 0){
      setUserName(username =>  username = profileUserName)  
    }

  } 

  function logout(){ 
    setLogin(login => !login) 
    localStorage.removeItem('login') 
    localStorage.removeItem('Username') 
    setUserName(userName => userName = '') 
  }    


  function AddLikeToMesages(MessageId){   

    let arrayNames = []
    messages.map((item) => item._id === MessageId ? arrayNames.push(item['UserLiked']) : null)  
    if(!arrayNames[0].includes(userName)){
      setMessages(messages => messages = messages.map((item) => item._id === MessageId ? {...item, 'Likes': item.Likes + 1 } : item))   
      setMessages(messages => messages = messages.map((item) => item._id === MessageId ? {...item, 'UserLiked': [...item.UserLiked, userName] } : item))    

        axios.post('/AddLikeToMessage', {
        MessageID: MessageId, 
        UserName: userName
        }).catch(function (error){
        console.log(`Error: ${error}`)
        })    

      } else {
        console.log('You have already liked this:)') 
        setMessages(messages => messages = messages.map((item) => item._id === MessageId ? {...item, 'Likes': item.Likes - 1 } : item))  
        setMessages(messages => messages = messages.map((item) => item._id === MessageId ? {...item, 'UserLiked': item.UserLiked.filter((item) => item !== userName) } : item))  

        axios.post('/UnlikeToMessage', {
          MessageID: MessageId, 
          UserName: userName
          }).catch(function (error){
          console.log(`Error: ${error}`)
          })  

      }  

  }

  function ShowUserProfile(){ setUserProfileShow(UserProfileShow => !UserProfileShow) }

  if(login) {
  return ( 
    <div className="App">  
      <Header LoggingOut={logout} ShowUserProfile={ShowUserProfile}/>   
      { UserProfileShow ? <UserProfile Username={userName} NumberOfMessages={userMessages}/> : null}
      { editWindow ? <EditWindow SetEditMessage={editMessage} GetCloseEditWindow={GetCloseEditWindow} ChangeEditMessage={ChangeEditMessage}/> : null }
      <Form GetMessageData={GetMessageData} CurrentUserID={userID[0]}/>  
      <div className='MessageCon'>
        {messages.map(item => {
          return <UserMessage id={item._id} message={item.UserMessage} MessageID={item.UserIDMessage} date={item.Date} GetMessageID={GetMessageID} GetEditMessage={GetEditMessage} CurrentUserID={userID[0]} Likes={item.Likes} AddLike={AddLikeToMesages}/>
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
