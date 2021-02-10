import React from 'react';
import './Styles.scss';
import bvideo from '../backgroundVideo.mp4';
import LoginModal from '../LoginModal/LoginModal';
import SignupModal from '../SignupModal/SignupModal';

const LandingPage = ( {handleSignup, handleLoginSubmit, isLoginOpen, setIsLoginOpen, isSignupOpen, setIsSignupOpen, loginData, setLoginData, signupData, setSignupData} ) => {

    return (
        <>
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
      </>
    )
};

export default LandingPage;
