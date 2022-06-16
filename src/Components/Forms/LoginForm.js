import React, {useState, useEffect} from "react";
import './LoginForm.scss'
import {useNavigate, Link} from 'react-router-dom'
import ErrorMessage from "../UI/ErrorMessage";

const LoginForm = (props) => {

  //använder navigate för att hantera förflyttning mellan sidor
  const navigate = useNavigate();

  // hooks för att hantera registrerade användare och inloggad användare
  const [currentUsersState, setCurrentUsersState] = useState(props.allusers);
  const [loggedinUser, setLoggedInUser] = useState(props.currentuser)

  //hooks för att spara användaren input
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')

  //hook för att hantera error modul
  const [error, setError] = useState();

  //funktioner för att spara användarens input
  const handleEmail = (e) => {
    setEnteredEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setEnteredPassword(e.target.value)
  }
  //funktion för att hantera login
	const handleLogin = (e) => {
		e.preventDefault();
    //validering över om användare fyllt i båda fälten
    if (
			enteredPassword.trim().length === 0 ||
			enteredEmail.trim().length === 0
		) {
      //annars error meddelande
      setError({
        message: 'Please fill in all fields'
      });
			return;
		}
    //sparar användarens input i ett objekt
    const user = {
      username: enteredEmail,
      password: enteredPassword,
    }
    //validering om användaren finns sedan tidigare
    if(currentUsersState !== null){
      let newUser = currentUsersState.find((userObj) => userObj.email === enteredEmail
      )
      //om både mail och lösenord finns registrerade så navigera till Home
      if(newUser !== undefined){
        if(newUser.password === enteredPassword){
          localStorage.setItem('user', JSON.stringify([newUser]))
          setLoggedInUser(newUser)
          navigate('./Home')
        } else {
          setError({
            message: 'Wrong password'
          });
          return;
        }
      } else{
        setError({
          message: 'Wrong Email'
        });
        return;
      }
    } else{
      setError({
        message: 'This user does not exist'
      });
      return;
    }
	};

  //funktion för att hantera felmeddelande
  const errorHandler = () => {
    setError(null);
  }
  //hook som hämtar registerarde användare och kontrollerar om någon är inloggad
  useEffect(() =>{
    let users = JSON.parse(localStorage.getItem("users"))
    let user = JSON.parse(localStorage.getItem("user"))
    if(user !== null){
      navigate('/Home')
    }
    setCurrentUsersState(users)
  },[])

  //rendering 
	return (
		<>
    {error &&	<ErrorMessage message={error.message} onConfirm={errorHandler}/>}
			<form className="login-form" onSubmit={handleLogin}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Email"
          onChange={handleEmail}
				></input>
        <label htmlFor="password">Password</label>
        <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        onChange={handlePassword}></input>
        <button type="submit">Submit</button>
        <Link to="/CreateAccount">Create Account</Link>
			</form>
		</>
	);
};

export default LoginForm;
