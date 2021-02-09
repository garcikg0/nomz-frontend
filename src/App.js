import React , { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import bvideo from './components/backgroundVideo.mp4';
import LoginModal from './components/LoginModal/LoginModal';
import SignupModal from './components/SignupModal/SignupModal';
import HomeMenu from './components/HomeMenu/HomeMenu';
import RecipeSearch from './components/RecipeSearch/RecipeSearch';

const App = () => {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
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
        debugger
        if (!data.error){
          handleLogin(data)
          debugger
        }
      })
    debugger}
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
    history.push('/home')
    console.log(currentUser)
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
      <Route path="/" exact>
        <div className="homeContainer">
        <div className="jumbotron">
          <div className="jumbotron-video">
            <video class="videoTag"autoPlay loop muted >
              <source src={bvideo} type="video/mp4"/>
            </video>
          </div>
        </div>
        <div className="homeHeader">
          <h1>Nomz</h1>
        </div>
        <div className="homeSubHeader">
          <h2>Your time-saving recipe and ingredient management tool</h2>
        </div>
        <div className="container-home-card-deck">
          <div className="home-card-deck"> 
          {/* Card component start */}
            <div className="home-card">
              <img className="card-img-top" src="https://static.thenounproject.com/png/2174492-200.png" alt=""></img>        
              <div className="card-body">
                <div className="card-title">Your Kitchen and Grocery List</div>
                  <hr></hr>
                  <div className="card-text">
                    <p>Catalog and manage ingredients in your Kitchen</p>
                    <br></br>
                    <p>Ingredients that are running low are automatically added to your Grocery List</p>
                    <br></br>
                    Easily add ingredients from your Grocery List to Your Kitchen while you shop
                  </div>
              </div>
            </div>
            {/* Card Component end */}
            {/* Card component start */}
            <div className="home-card">
              <img className="card-img-top" src="https://static.thenounproject.com/png/1001683-200.png" alt=""></img>        
              <div className="card-body">
                <div className="card-title">Recipe Search</div>
                  <hr></hr>
                  <div className="card-text">
                    <p>Search over 2 million recipes online</p>
                    <br></br>
                    <p>Visit the recipe's webpage for more details in just one click</p>
                    <br></br>
                    Easily add your favorite finds to your Recipe, or add your own! 
                  </div>
              </div>
            </div>
            {/* Card Component end */}
            {/* Card component start */}
              <div className="home-card">
              <img className="card-img-top" src="https://static.thenounproject.com/png/1132473-200.png" alt=""></img>        
              <div className="card-body">
                <div className="card-title">Your Recipe Library</div>
                  <hr></hr>
                  <div className="card-text">
                    <p>Your favorite recipes - regardless of web address - stored in one place</p>
                    <br></br>
                    <p>Spend less time seeing if you have all the ingredients needed for a recipe</p>
                    <br></br>
                    List view of a recipe's ingredients followed by any matches to available ingredients in Your Kitchen 
                  </div>
              </div>
            </div>
            {/* Card Component end */}
          </div>
        </div> 
      </div>
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} loginData={loginData} setLoginData={setLoginData} handleLoginSubmit={handleLoginSubmit}/>
      <SignupModal open={isSignupOpen} onClose={() => setIsSignupOpen(false)} signupData={signupData} setSignupData={setSignupData} handleSignup={handleSignup}/>
      </Route>
      <Route path="/home" exact>
        {currentUser ? (
          <HomeMenu />
        ) : <Redirect to='/' />}
      </Route>
      <Route path="/kitchen" exact>
        {currentUser ? (
          <RecipeSearch />
        ) : <Redirect to='/' />}
      </Route>
      <Route path="/recipesearch" exact>
        <div className="homeContainer">
          <h1>Recipe Search Page Test</h1>
        </div>
      </Route>
      <Route path="/recipelibrary" exact>
        <div className="homeContainer">
          <h1>Recipe Library Test</h1>
        </div>
      </Route>
    </Switch>
    </>
  );
}

export default withRouter(App);
