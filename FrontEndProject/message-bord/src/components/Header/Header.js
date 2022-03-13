
import './Header.css'

function Header(props){ 

    function Logout() {
        console.log('logging out')
        props.LoggingOut()
    }  

    function ShowUserProfile(){
        props.ShowUserProfile()
    }

    return(
        <div className="Header"> 
            <div className="HeaderItem">
                <p>Message bored Prototype</p>
            </div> 
            <div className="LogoutItem"> 
                <button onClick={ShowUserProfile}>User Profile</button>
                <button onClick={Logout}>Logout</button> 
            </div>
        </div>
    )
} 

export default Header