import React, { useState } from 'react';
import AddIngredientModal from '../AddIngredientModal/AddIngredientModal';
import IngredientCard from '../IngredientCard/IngredientCard';
import KitchenNavbar from '../KithenNavbar/KitchenNavbar';
import './Styles.scss';

const KitchenPage = ( {userKitchens, kitchenRendered, setKitchenRendered, ingredientsOfKitchenRendered, setIngredientsOfKitchenRendered} ) => {

    const [isAddIngredientOpen, setIsAddIngredientOpen] = useState(false);

    // Adding an Ingredient
    const addIngredient = (newIngredient) => {
        let newArr = [...ingredientsOfKitchenRendered, newIngredient]
        setIngredientsOfKitchenRendered(newArr)
    }

    // Deleting an Ingredient
    const updatedIngredients = (ingredient) => {
        let updatedIngredients = ingredientsOfKitchenRendered.filter(obj => obj.id !== ingredient.id)
        setIngredientsOfKitchenRendered(updatedIngredients)
    }

    // Editing an Ingredient
    const editedIngredients = (editedIngredient) => {
        const elementsIndex = ingredientsOfKitchenRendered.findIndex(element => element.id === editedIngredient.id)
        let newArr = [...ingredientsOfKitchenRendered]
        newArr[elementsIndex] = {...newArr[elementsIndex], name: editedIngredient.name, storage: editedIngredient.storage, status: editedIngredient.status, icon: editedIngredient.icon, notes: editedIngredient.notes}
        setIngredientsOfKitchenRendered(newArr)
    }

    let renderIngredients = ingredientsOfKitchenRendered.map((ingredient) => {
        return(
            <IngredientCard 
            key={ingredient.id}
            ingredient={ingredient}
            kitchen_id={kitchenRendered.id}
            updatedIngredients={updatedIngredients}
            editedIngredients={editedIngredients}
            />
        )
    })

    let handleAddIngredientButton = e => {
        // console.log(ingredientsOfKitchenRendered)
        // console.log(kitchenRendered)
        setIsAddIngredientOpen(true)
    }

    return(
        <>
        <div className='kitchen-container'>
            <KitchenNavbar 
            userKitchens={userKitchens}
            kitchenRendered={kitchenRendered}
            setKitchenRendered={setKitchenRendered}
            setIngredientsOfKitchenRendered={setIngredientsOfKitchenRendered}
            />
            <div className='kitchen-card-deck-container'>
                <div className='kitchen-card-deck'>
                    {renderIngredients}
                    {/* <div className='kitchen-card'>
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/2942672-200.png' alt="example"/>
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
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/1422989-200.png' alt="example"/>
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
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/1317943-200.png' alt="example"/>
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
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/1015530-200.png' alt="example"/>
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
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/1434570-200.png' alt="example"/>
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
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/3478937-200.png' alt="example"/>
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
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/1317946-200.png' alt="example"/>
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
                        <img className='kitchen-card-img-top' src='https://static.thenounproject.com/png/2327576-200.png' alt="example"/>
                        <div className='kitchen-card-body'>
                            <h5>Poultry</h5>
                            <p>Status: </p>
                            <p>Storage</p>
                            <button>Edit</button>
                            <button>Running Low</button>
                            <button>Remove</button>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="add-ingredient" onClick={handleAddIngredientButton}>Add Ingredient</div>
        </div>
        <AddIngredientModal 
        open={isAddIngredientOpen}
        onClose={()=> {setIsAddIngredientOpen(false)}}
        kitchenRendered={kitchenRendered}
        addIngredient={addIngredient}
        />
        </>
    )
}

export default KitchenPage;