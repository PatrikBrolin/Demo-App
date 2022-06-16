import React, { useEffect, useState } from "react";
import "./LoginForm.scss";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../UI/ErrorMessage";

const CreateAccountForm = (props) => {
  //använder navigate för att hoppa till annan sida
  const navigate = useNavigate();
  
  //hook för att hantera registrerade användare
	const [currentUsersState, setCurrentUsersState] = useState([]);

  //hook för att hantera inloggad användare
	const [loggedinUser, setLoggedInUser] = useState(null);

  //hook för att spara inmatning fron användare
	const [enteredUsername, setEnteredUsername] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [enteredEmail, setEnteredEmail] = useState("");

  //hook för att hantera fel modul
  const [error, setError] = useState();


  //funktioner för att hantera inmatning från användare  
	const handleUsername = (e) => {
		setEnteredUsername(e.target.value);
	};
	const handlePassword = (e) => {
		setEnteredPassword(e.target.value);
	};
	const handleEmail = (e) => {
		setEnteredEmail(e.target.value);
	};

  //funktion för att hantera registrering
	const handleRegistration = (e) => {
		e.preventDefault();

    //validering för tomma fält 
		if (
			enteredUsername.trim().length === 0 ||
			enteredPassword.trim().length === 0 ||
			enteredEmail.trim().length === 0
		) {
      //vid tomma fält error meddelande
      setError({
        message: 'Please fill in all fields'
      });
			return;
		}

    //sparar användarens ifyllda fält i ett objekt
		const user = {
			username: enteredUsername,
			password: enteredPassword,
			email: enteredEmail,
		};
    //validering för om det finns några tidigare registreade användare
		if (currentUsersState.length > 0) {
			let newUser = currentUsersState.find(
				(userObj) => userObj.email === enteredEmail
			);
      //om registerad användare inte finns, lägg till den
			if (newUser === undefined) {
				localStorage.setItem(
					"users",
					JSON.stringify([...currentUsersState, user])
				);
				localStorage.setItem("user", JSON.stringify([user]));
				setCurrentUsersState([...currentUsersState, user]);
				setLoggedInUser(user);
        // annars felmeddelande
			} else {
				setError({
          message: 'This users already exists'
        });
        return;
			}
      //om inga användare finns registrerade så lägg till användare utan att jämföra
		} else {
			localStorage.setItem("users", JSON.stringify([user]));
			localStorage.setItem("user", JSON.stringify([user]));
			setCurrentUsersState([user]);
			setLoggedInUser(user);
		}
	};
  //funktion för felmeddelande
  const errorHandler = () => {
    setError(null);
  }
  //hook som kontrollerar om det finns registerade användare vid rendering och sparar dessa till state
	useEffect(() => {
		let users = JSON.parse(localStorage.getItem("users"));
		if (users !== null) {
			setCurrentUsersState(users);
		}
	}, []);
  //hook som skickar vidare användare vid färdig registrering
	useEffect(() => {
		if (loggedinUser !== null) {
			navigate("/Home");
		}
	}, [handleRegistration]);
  //renderingen
	return (
		<>
		{error &&	<ErrorMessage message={error.message} onConfirm={errorHandler}/>}
			<form className="login-form" onSubmit={handleRegistration}>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					id="username"
					placeholder="Username"
					onChange={handleUsername}
				></input>
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
					onChange={handlePassword}
				></input>
				<button type="submit">Submit</button>
				<Link to="/">Already a user</Link>
			</form>
		</>
	);
};

export default CreateAccountForm;
