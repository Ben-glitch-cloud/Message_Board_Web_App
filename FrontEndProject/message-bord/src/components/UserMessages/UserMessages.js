import './UserMessages.css'

function UserMessage(props){ 

    function DeleteMessage(ID){ props.GetMessageID(ID) } 

    function EditMessage(ID, message){ 
        props.GetEditMessage(ID, message)
    }


    return(
        <div className="UserMessage">
            <p>{props.message}</p>
            <p>{props.date}</p> 
            <button className='delete' onClick={() => DeleteMessage(props.id)}>Delete</button> 
            <br/>
            <button className='edit' onClick={() => EditMessage(props.id, props.message)}>Edit</button>
        </div>
    )
} 

export default UserMessage