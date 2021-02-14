import React from 'react';
import { Link } from 'react-router-dom';
import './Styles.scss';

const HomeMenu = () => {

    return(
        <div className="container">
            <div className="card-deck-container">
                <div className="card-deck">
                    <div className="card">
                        <Link to ="/kitchen">
                        <img className="card-img" src="https://images.pexels.com/photos/3952043/pexels-photo-3952043.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="kitchen"></img>
                        <div className="card-overlay">
                            <div className="card-image-title">My Kitchen</div>
                        </div>
                        </Link>
                    </div>
                    <div className="card">
                        <Link to ="/recipesearch">
                        <img className="card-img" src="https://images.pexels.com/photos/4049786/pexels-photo-4049786.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="recipesearch"></img>
                        <div className="card-overlay">
                            <div className="card-image-title">Recipe Search</div>
                        </div>
                        </Link>
                    </div>
                    <div className="card">
                        <Link to ="/recipelibrary">
                        <img className="card-img" src="https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/image_nodes/recipe-box.jpg?itok=dkqZiJ0X"  alt="recipelibrary"></img>
                        <div className="card-overlay">
                            <div className="card-image-title">My Recipe Library</div>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomeMenu;