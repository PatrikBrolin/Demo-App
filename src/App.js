import React, {useState} from "react";
import { Routes, Route} from "react-router-dom";
import LoginForm from './Components/Forms/LoginForm'
import CreateAccountForm from './Components/Forms/CreateAccountForm'
import Home from "./Components/Home";

function App() {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")))
  
  const [registredUsers, setRegistrerdUsers] = useState(JSON.parse(localStorage.getItem("users")))
  
	return (
    //3 sidor som navigeras via Route
			<Routes>
        <Route path='/' element={<LoginForm currentuser={currentUser} allusers={registredUsers} />}  />
        <Route path='CreateAccount' element={< CreateAccountForm currentuser={currentUser} allusers={registredUsers} setNewUser={setRegistrerdUsers}/>} />
        <Route path='/Home' element={<Home currentuser={currentUser}/>}/>
      </Routes>

	);
}

export default App;
