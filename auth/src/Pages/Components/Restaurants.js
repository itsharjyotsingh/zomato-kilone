import React from 'react';
import { useState,useEffect } from 'react';

import RestaurantCompo from './Restaurant Components/ResraurantCompo';

export default function Restaurants() {

    const [mila, setMila] = useState([]);

    useEffect(()=>{getRestaurants()},[]);

    const getRestaurants = async() =>{
        try {
            const data = await fetch('http://localhost:5000/getRestaurants',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON',
                }
            });

            setMila(await data.json());

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
            <h1>Restaurants</h1>
                <ul id='restaurants'><RestaurantCompo mila={mila}/></ul>
            </>
    );
}