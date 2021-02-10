import React , { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomeMenu from './components/HomeMenu/HomeMenu';
import RecipeSearch from './components/RecipeSearch/RecipeSearch';
import LandingPage from './components/LandingPage/LandingPage';

const App = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: ""
  });
  
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })
  let history = useHistory()

  useEffect(() => {
    if (localStorage.token) {
      fetch(`http://localhost:3000/autologin`, {
        headers: {
          "Authorization" : `Bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then(data => {
        // debugger
        if (!data.error){
          handleLogin(data)
          debugger
        }
      })
      // debugger
    }
  }, []);

  const handleSignup = e => {
    e.preventDefault()
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
    })
    .then(r => r.json())
    .then(data => {
        const { user, token } = data
        handleLogin(user)
        localStorage.token = token
    })  
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(r => r.json())
    .then(data => {
        const { user, token } = data
        handleLogin(user)
        localStorage.token = token
    })
  };

  const handleLogin = user => {
    setIsLoginOpen(false)
    debugger
      setCurrentUser(user)
      // history.push('/home') 
    debugger
  };

  const handleLogout = () => {
    localStorage.removeItem("token")
    setCurrentUser(null)
    history.push('/')
    setIsSignupOpen(false)
  };

  return (
    <>
    <Navbar setIsLoginOpen={setIsLoginOpen} setIsSignupOpen={setIsSignupOpen} currentUser={currentUser} handleLogout={handleLogout} />
    <Switch>
      <Route path="/home" exact>
        <HomeMenu />
      </Route>
      <Route path="/kitchen" exact>
        <div className="homeContainer">
          <h1>Recipe Library Test</h1>
        </div>
      </Route>
      <Route path="/recipesearch" exact>
        <RecipeSearch />
      </Route>
      <Route path="/recipelibrary" exact>
        <div className="homeContainer">
          <h1>Recipe Library Test</h1>
        </div>
      </Route>
      <Route path="/" exact> 
      { currentUser ? 
        <Redirect to='/home' /> : 
        <LandingPage 
          handleSignup={handleSignup}
          handleLoginSubmit={handleLoginSubmit}
          isLoginOpen={isLoginOpen}
          setIsLoginOpen={setIsLoginOpen}
          isSignupOpen={isSignupOpen}
          setIsSignupOpen={setIsSignupOpen}
          loginData={loginData}
          setLoginData={setLoginData}
          signupData={signupData}
          setSignupData={setSignupData}
        />}
      </Route>
    </Switch>
    </>
  );
}

export default withRouter(App);


// {currentUser ? <Redirect to=“/home” /> : <Component />}

      {/* {currentUser ? <Redirect to=“/home” /> : (

      ) />} */}