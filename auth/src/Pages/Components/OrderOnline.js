import React from 'react';
import { useState,useEffect } from 'react';
import Lottie from 'lottie-react';

import RestauCards from './RestauCards.js';
import animation from '../../99276-loading-utensils.json';


export default function OrderOnline() {
    
    const [loader , setLoader] = useState(false);

    const [data , setData] = useState([]);

    const getRestaurants = async() => {
        try {
            setLoader(true);
            const res = await fetch('http://localhost:5000/getRestaurants',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON',
                }
            });

            const dat = await res.json();
            setTimeout(()=>{
                setData(dat);
                setLoader(false);
            },1000);
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
        <div>
        {
        loader ? (
            <div className='w-32'>
                <Lottie className='w-10' animationData={animation}/>
            </div>
        ) :
        <div className='container my-5'>
            <div className='container d-flex justify-content-center'>
                <h1>Restaurants</h1>
            </div>
            <div className='mx-auto container d-flex justify-content-evenly my-5 flex-wrap'>
                {data.map((val,id)=><RestauCards kry={id} name={val.name} id={val._id}/>)}
            </div>
        </div>
        }
        </div>
    );
}