import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai'

import './UserMessages.css'

function UserMessage(props){ 

    function DeleteMessage(ID){ props.GetMessageID(ID) } 
 
    function EditMessage(ID, message){ props.GetEditMessage(ID, message) }   

    function AddLike(id){  props.AddLike(id)} 

    // like button update both messages and database  
    // add likes into the data base

    return(
        <div className="UserMessage">
            <p>{props.message}</p>
            <p className="MessageDate">{props.date}</p>  
            <div className='buttonArea'>
                { props.MessageID === props.CurrentUserID ? <button className='delete' onClick={() => DeleteMessage(props.id)}>Delete</button> : null }
                <br/>
                { props.MessageID === props.CurrentUserID ? <button className='edit' onClick={() => EditMessage(props.id, props.message)}>Edit</button> : null}
            </div> 
            {/* <p onClick={() => AddLike(props.id)}>{props.Like === 0 ? <AiOutlineLike/> : props.Like}</p> */}   
            <div className='LikeArea'>
            <AiOutlineLike onClick={() => AddLike(props.id)} size={20} className="LikeAreaItem"/> 
            <p className="LikeAreaItem">{props.Likes}</p>
            </div>
        </div>
    )
} 

export default UserMessage