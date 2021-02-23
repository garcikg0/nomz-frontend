import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddKitchenModal from '../AddKitchenModal/AddKitchenModal';
import EditKitchenModal from '../EditKitchenModal/EditKitchenModal';
import KitchenCard from '../KitchenCard/KitchenCard';
import './Styles.scss';

const HomeMenu = ({ userKitchens, setUserKitchens, kitchenRendered, setKitchenRendered, setIngredientsOfKitchenRendered}) => {

    const [isKitchenAddOpen, setIsKitchenAddOpen] = useState(false)
    const [isKitchenEditOpen, setIsKitchenEditOpen] = useState(false);
    const [kitchenData, setKitchenData] = useState(null);
    const [kitchenUser, setKitchenUser] = useState(null)
    

    // Adding a Kitchen
    const addKitchen = (newKitchen) => {
        if(userKitchens === null){
            setUserKitchens([newKitchen])
        } else {
            let newArr = [...userKitchens, newKitchen]
            setUserKitchens(newArr)
        }
    }
    
    // Deleting a Kitchen
    const updatedKitchens = (kitchen) => {
        let updatedUserKitchens = userKitchens.filter(obj => obj.id !== kitchen.id)
        setUserKitchens(updatedUserKitchens)
    }

    // Editing a Kitchen
    const editedKitchens = (editedKitchen) => {
        const elementsIndex = userKitchens.findIndex(element => element.id === editedKitchen.id)
        let newArr = [...userKitchens]
        newArr[elementsIndex] = {...newArr[elementsIndex], name: editedKitchen.name}
        setUserKitchens(newArr)
        setKitchenData(null)
    }

    let kitchensArr = userKitchens.map((kitchen) => {
        return(
            <KitchenCard
            key={kitchen.id}
            kitchen={kitchen}
            updatedKitchens={updatedKitchens}
            setUserKitchens={setIsKitchenEditOpen}
            setIsKitchenEditOpen={setIsKitchenEditOpen}
            kitchenData={kitchenData}
            setKitchenData={setKitchenData}
            />
        )
    })

    const handleKitchenClick = e => {
        if (kitchenRendered === null){
            let kitchenToRender = userKitchens[0]
            setKitchenRendered(kitchenToRender)
            setIngredientsOfKitchenRendered(kitchenToRender.ingredients)
        }
    }

    return(
        <>
        <div className="container">
            <div className="card-deck-container">
                <div className="card-deck">
                    <div className="card" onClick={handleKitchenClick}>
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
            <div className="kitchen-list-container">
            <button onClick={() => setIsKitchenAddOpen(true)}>Add Kitchen</button>
                <div className="kitchen-list-card-deck">
                    {kitchensArr}
                </div>
            </div>
        </div>
        <EditKitchenModal 
        open={isKitchenEditOpen}
        onClose={() => setIsKitchenEditOpen(false) }
        kitchenData={kitchenData}
        setKitchenData={setKitchenData}
        editedKitchens={editedKitchens}
        />
        <AddKitchenModal 
        open={isKitchenAddOpen}
        onClose={() => setIsKitchenAddOpen(false)}
        userKitchens={userKitchens}
        setKitchenUser={setKitchenUser}
        kitchenUser={kitchenUser}
        addKitchen={addKitchen}
        />
        </>
    )
};

export default HomeMenu;