import './EditWindow.css'
import React, { useEffect, useState } from 'react' 

function EditWindow(props){

    const [ID, setID] = useState(props.SetEditMessage[0]._id)  

    const [messageEdited, setMessageEdited] = useState(false)

    const [UserMessage, setUserMessage] = useState(props.SetEditMessage[0].UserMessage)  

    function EditMessage(e){ 
        setUserMessage(e.target.value)
        setMessageEdited(message => !message)
    } 

    function SubmitEditChange(e){  
        e.preventDefault() 
        if(!messageEdited){ return }
        props.ChangeEditMessage({UserMessage: UserMessage, ID: ID})
    }

    //Creat the editing form. 

    //ones a user has edited the message send it to the database to be fixed.

    function CloseEditWindow(){ props.GetCloseEditWindow() }
    
    return( 
    <div className="EditWindow">
        <div className='EditWindowCon'> 
        <div className='EditWindowConNav'>
            <p>Edit Message</p>   
            <button onClick={CloseEditWindow}>close</button> 
        </div>
        <div className='EditWindowConMessage'>
            <form onClick={SubmitEditChange}> 
                <textarea type="text" value={UserMessage} onChange={EditMessage} rows="4" cols="40"/>
                <input type="submit" value="Edit"/>
            </form>
        </div>
        </div>
    </div> 
    )
} 

export default EditWindow