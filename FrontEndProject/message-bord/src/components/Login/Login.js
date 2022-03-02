import './Login.css' 
import axios from 'axios'; 

function Login(props){  

    function GetDetails(e){
        e.preventDefault() 
        const UserDetails = {UserName: e.target[0].value, Password: e.target[1].value} 
        axios.get('/CheckUserDetails', {
            params: {
                UserName: UserDetails['UserName'], 
                Password: UserDetails['Password']
            }
        }).then((res) => { 
            if(res['data']){
                GetMessageBord()
            } else {
                console.log('No username or password found')
            }
        }).catch((error) => {
            console.log(`Error: ${error}`)
        })
    } 

    function GetMessageBord(){ props.GetMessageBord()}

    return(
        <div className='Login'>  
            <div className='LoginFormCon'> 
                <p className='HeaderPage'>Mesasge Board</p> 
                <p className='LoginDescription'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <div className='LoginFormItems'>   
                    <p className='LoginHeader'>Login</p>
                    <form onSubmit={GetDetails}> 
                        <p>UserName</p>
                        <input type="text" name='Username'/>  
                        <p>Password</p>
                        <input type="text" name='Password'/>  
                        <p></p>
                        <input className='submitButton' type="submit" value="Login"/>
                    </form>
                </div>
            </div> 
            <div className='LoginImage'></div>
        </div>
    )
} 

export default Login
