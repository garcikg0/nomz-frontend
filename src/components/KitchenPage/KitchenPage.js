import React, { useState } from 'react';
import AddIngredientModal from '../AddIngredientModal/AddIngredientModal';
import IngredientCard from '../IngredientCard/IngredientCard';
import KitchenNavbar from '../KitchenNavbar/KitchenNavbar';
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