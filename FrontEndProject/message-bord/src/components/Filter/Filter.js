import './Filter.css'

function Fillter(props){ 

    function FilterMessages(e){
        props.FilterUserMessages(e)
    }

    return(
        <div> 
            <div className='NavFilter'>
                <button onClick={() => FilterMessages("All")}>All Messages</button> 
                <button onClick={() => FilterMessages("MY")}>My Messages</button>
            </div>
        </div>
    )
} 

export default Fillter;