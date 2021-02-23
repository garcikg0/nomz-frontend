import React , { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomeMenu from './components/HomeMenu/HomeMenu';
import RecipeSearch from './components/RecipeSearch/RecipeSearch';
import LandingPage from './components/LandingPage/LandingPage';
import KitchenPage from './components/KitchenPage/KitchenPage';

const App = () => {

  const [currentUser, setCurrentUser] = useState(null); //user logged in 
  const [userKitchens, setUserKitchens] = useState(null); // current user's kitchens state 
  const [kitchenRendered, setKitchenRendered] = useState(null) // kitchen rendering
  const [ingredientsOfKitchenRendered, setIngredientsOfKitchenRendered] = useState(null);
  
  const [isLoginOpen, setIsLoginOpen] = useState(false);//LogInModal state for rendering
  const [isSignupOpen, setIsSignupOpen] = useState(false); //SignUpModal state for rendering
  
  const [signupData, setSignupData] = useState({ //create new user state 
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: ""
  });
  const [loginData, setLoginData] = useState({ //login state
    username: "",
    password: ""
  })
  let history = useHistory()

  useEffect(() => { //componentDidMount User record with it's respective Kitchens, Ingredients, and Recipes 
    if (localStorage.token) {
      fetch(`http://localhost:3000/autologin`, {
        headers: {
          "Authorization" : `Bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then(data => { // data is User with Kitchens, and their Kitchens with Recipes and Ingredients
        if (!data.error){
          handleLogin(data)
        }
      })
    }
  }, [kitchenRendered, ingredientsOfKitchenRendered]);

  const handleSignup = e => { //Creating new User with SignUp Modal
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

  const handleLoginSubmit = e => { //User logging in if no token
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

  const handleLogin = user => { //login helper to set states
    setIsLoginOpen(false)
    setUserKitchens(user.kitchens)
    setCurrentUser(user)
  };

  const handleLogout = () => { //logout with token removal and states to null
    localStorage.removeItem("token")
    setCurrentUser(null)
    setUserKitchens(null)
    history.push('/')
    setIsSignupOpen(false)
  };



  return (
    <>
    <Navbar 
    setIsLoginOpen={setIsLoginOpen} 
    setIsSignupOpen={setIsSignupOpen} 
    currentUser={currentUser} 
    handleLogout={handleLogout}
    userKitchens={userKitchens}
    kitchenRendered={kitchenRendered}
    setKitchenRendered={setKitchenRendered}
    setIngredientsOfKitchenRendered={setIngredientsOfKitchenRendered}
    />
    <Switch>
      <Route path="/home" exact>
        { currentUser ? 
        <HomeMenu 
        userKitchens={userKitchens}
        setUserKitchens={setUserKitchens}
        currentUser={currentUser} 
        kitchenRendered={kitchenRendered}
        setKitchenRendered={setKitchenRendered}
        setIngredientsOfKitchenRendered={setIngredientsOfKitchenRendered}
        /> : 
        <Redirect to='/' />
        }
      </Route>
      <Route path="/kitchen" exact>
        { currentUser ? 
        <KitchenPage 
        currentUser={currentUser} 
        userKitchens={userKitchens}
        kitchenRendered={kitchenRendered}
        setKitchenRendered={setKitchenRendered}
        ingredientsOfKitchenRendered={ingredientsOfKitchenRendered}
        setIngredientsOfKitchenRendered={setIngredientsOfKitchenRendered}
        /> :
        <Redirect to='/' /> 
        }
      </Route>
      <Route path="/recipesearch" exact>
        { currentUser ? 
        <RecipeSearch /> :
        <Redirect to='/' />
        }
      </Route>
      <Route path="/recipelibrary" exact>
        { currentUser ? 
        <div className="homeContainer">
        <h1>Recipe Library Test</h1>
        </div> :
        <Redirect to='/' />
        }
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