import React from 'react';
import { useState,useEffect } from 'react';

import RestauCards from './RestauCards.js';


export default function OrderOnline() {
    
    const [data , setData] = useState([]);

    const getRestaurants = async() => {
        try {
            const res = await fetch('http://localhost:5000/getRestaurants',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON',
                }
            });

            const dat = await res.json();
            setData(dat);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getRestaurants();
        return;
    }
    ,[]);

    return (
        <>
        <div className='container my-5'>
            <div className='container d-flex justify-content-center'>
                <h1>Restaurants</h1>
            </div>
            <div className='mx-auto container d-flex justify-content-evenly my-5 flex-wrap'>
                {data.map((val,id)=><RestauCards kry={id} name={val.name} id={val._id}/>)}
            </div>
        </div>
        </>
    );
}