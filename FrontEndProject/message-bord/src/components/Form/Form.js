import React, { useEffect, useState } from 'react' 
import './Form.css'

let IdNumber = 1 

function Form(props){    

    const [messageState, setMessageState] = useState('')

    function GetDate(){ return new Date().toString().split(' ').slice(1, 4).join(' / '); } 

    function MessageStateChange(e){ setMessageState(e.target.value)}

    function GetPostMessage(e){
        e.preventDefault() 
        const NewMessageObject = {_id: IdNumber, UserMessage: messageState, Date: GetDate()} 
        IdNumber++ 
        props.GetMessageData(NewMessageObject) 
        setMessageState('')
    }

    return( 
        <div className='Form'>
            <form onSubmit={GetPostMessage} className="FormCon">
                <textarea onChange={MessageStateChange} value={messageState} type="text" rows="4" cols="50" placeholder='Share your thoughts...'/>
                <input className='submit' type="submit" value="Submit"/>
            </form>
        </div> 
    )
} 

export default Form