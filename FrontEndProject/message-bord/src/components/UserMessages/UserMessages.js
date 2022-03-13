import './UserMessages.css'

function UserMessage(props){ 

    function DeleteMessage(ID){ props.GetMessageID(ID) } 

    function EditMessage(ID, message){ props.GetEditMessage(ID, message) }  

    return(
        <div className="UserMessage">
            <p>{props.message}</p>
            <p className="MessageDate">{props.date}</p>  
            <div className='buttonArea'>
                { props.MessageID === props.CurrentUserID ? <button className='delete' onClick={() => DeleteMessage(props.id)}>Delete</button> : null }
                <br/>
                { props.MessageID === props.CurrentUserID ? <button className='edit' onClick={() => EditMessage(props.id, props.message)}>Edit</button> : null}
            </div>
        </div>
    )
} 

export default UserMessage