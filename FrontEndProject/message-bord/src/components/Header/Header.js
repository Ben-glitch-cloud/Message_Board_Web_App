
import './Header.css'

function Header(props){ 

    function Logout() {
        console.log('logging out')
        props.LoggingOut()
    }

    return(
        <div className="Header"> 
            <div className="HeaderItem">
                <p>Message bored Prototype</p>
            </div> 
            <div className="LogoutItem">
                <button onClick={Logout}>Logout</button>
            </div>
        </div>
    )
} 

export default Header