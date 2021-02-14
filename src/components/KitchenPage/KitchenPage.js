import React from 'react';
import './Styles.scss';

const KitchenPage = () => {

    return(
        <div className='kitchen-container'>
            <div className='kitchen-card-deck-container'>
                <div className='kitchen-card-deck'>
                    <div className='kitchen-card'>
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/2942672-200.png' />
                        <div className='kitchen-card-body'>
                            <h5>Dairy</h5>
                            <p>Status: </p>
                            <p>Stored in the Fridge</p>
                            <button>Edit</button>
                            <button>Running Low</button>
                            <button>Remove</button>
                        </div>
                    </div>
                    <div className='kitchen-card'>
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/1422989-200.png' />
                        <div className='kitchen-card-body'>
                            <h5>Fruit</h5>
                            <p>Status: </p>
                            <p>Stored in the Pantry</p>
                            <button>Edit</button>
                            <button>Running Low</button>
                            <button>Remove</button>
                        </div>
                    </div>
                    <div className='kitchen-card'>
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/1422989-200.png' />
                        <div className='kitchen-card-body'>
                            <h5>Fruit</h5>
                            <p>Status: </p>
                            <p>Stored in the Freezer</p>
                            <button>Edit</button>
                            <button>Running Low</button>
                            <button>Remove</button>
                        </div>
                    </div>
                    <div className='kitchen-card'>
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/1317943-200.png' />
                        <div className='kitchen-card-body'>
                            <h5>Spices</h5>
                            <p>Status: </p>
                            <p>Stored in the Pantry</p>
                            <button>Edit</button>
                            <button>Running Low</button>
                            <button>Remove</button>
                        </div>
                    </div>
                    <div className='kitchen-card'>
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/1015530-200.png' />
                        <div className='kitchen-card-body'>
                            <h5>Flour</h5>
                            <p>Status: </p>
                            <p>Stored in the Pantry</p>
                            <button>Edit</button>
                            <button>Running Low</button>
                            <button>Remove</button>
                        </div>
                    </div>
                    <div className='kitchen-card'>
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/1434570-200.png' />
                        <div className='kitchen-card-body'>
                            <h5>Vegetables</h5>
                            <p>Status: </p>
                            <p>Stored in the Pantry</p>
                            <button>Edit</button>
                            <button>Running Low</button>
                            <button>Remove</button>
                        </div>
                    </div>
                    <div className='kitchen-card'>
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/3478937-200.png' />
                        <div className='kitchen-card-body'>
                            <h5>Seafood</h5>
                            <p>Status: </p>
                            <p>Stored in the Freezer</p>
                            <button>Edit</button>
                            <button>Running Low</button>
                            <button>Remove</button>
                        </div>
                    </div>
                    <div className='kitchen-card'>
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/1317946-200.png' />
                        <div className='kitchen-card-body'>
                            <h5>Condiments</h5>
                            <p>Status: </p>
                            <p>Storage</p>
                            <button>Edit</button>
                            <button>Running Low</button>
                            <button>Remove</button>
                        </div>
                    </div>
                    <div className='kitchen-card'>
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/2327576-200.png' />
                        <div className='kitchen-card-body'>
                            <h5>Poultry</h5>
                            <p>Status: </p>
                            <p>Storage</p>
                            <button>Edit</button>
                            <button>Running Low</button>
                            <button>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KitchenPage;