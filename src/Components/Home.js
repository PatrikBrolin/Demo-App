import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Home.scss'

const Home = (props) => {
  //använder navigering för att hoppa mellan sidor
  const navigate = useNavigate();

  //hook som sparar inloggad användare
  const [loggedinUser, setLoggedInUser] = useState(props.currentuser)

  //hook som hantera en counter
  const [counter, setCounter] = useState(30);

 
  //funktion för att logga ut
  const handleLogout = () => {
    navigate('/')
    localStorage.removeItem('user')
  }

  //hook som kontrollerar att det finns en inloggad användare
  useEffect(() =>{
    let user = JSON.parse(localStorage.getItem("user"))
    
    if(user === null){
      navigate('/')
    }
    setLoggedInUser(user)
  },[])

  //hook som hanterar en counter och som loggar ut användare när counter når 0
  useEffect(()=> {
    counter > 0 && setTimeout(() => setCounter(counter -1), 1000)
    if(counter <= 0){
      navigate('/')
      localStorage.removeItem('user')
    }
  }, [counter])

  
  //rendering av Home
  return(
    <div className='container-wrapper'>
      <p>Hi this is just a dummy app</p>
      <h2>Time until automatic logout ({counter})</h2>
      <button onClick={handleLogout}>Logout now</button>
    </div>
  );
}

export default Home