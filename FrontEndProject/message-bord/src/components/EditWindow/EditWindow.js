import './EditWindow.css'
import React, { useEffect, useState } from 'react' 

function EditWindow(props){
    
    console.log(props.SetEditMessage)  

    const [setID, ID] = useState(props.SetEditMessage[0]._id) 

    const [setUserMessage, UserMessage] = useState(props.SetEditMessage[0].UserMessage) 

    //Creat the editing form. 

    //ones a user has edited the message send it to the database to be fixed.

    function CloseEditWindow(){
        props.GetCloseEditWindow()
    }
    
    return( 
    <div className="EditWindow">
        <div className='EditWindowCon'>
            <p>Edit window</p>  
            
            <button onClick={CloseEditWindow}>close</button>
        </div>
    </div> 
    )
} 

export default EditWindow