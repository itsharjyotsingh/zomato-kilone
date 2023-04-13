import React from 'react';
import { useState,useEffect } from 'react';

import RestaurantCompo from './Restaurant Components/ResraurantCompo';

export default function Restaurants() {

    const [mila, setMila] = useState([]);

    useEffect(()=>{getRestaurants()},[]);

    function getRestaurants() {
        fetch('http://localhost:5000/getRestaurants',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON',
            }
        })
        .then((res)=>{
            res.json()
            .then((ress)=>{
                console.log('Putting data');
                ress.map((val)=>{
                    setMila((prev)=>[
                        ...prev,
                        val
                    ])
                })
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <>
            <h1>Restaurants</h1>
                <ul id='restaurants'><RestaurantCompo mila={mila}/></ul>
            </>
    );
}