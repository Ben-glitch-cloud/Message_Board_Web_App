import './UserProfile.css'

function UserProfile(props){ 

    return( 
        <div className='UserProfileCon'>
            <div className='UserProfile'>
                <h4>User Profile</h4> 
                <p className='info'>User Name: {props.Username}</p> 
                <p className='info'>Number of messages: {props.NumberOfMessages}</p>
            </div>
        </div>
    )
} 

export default UserProfile