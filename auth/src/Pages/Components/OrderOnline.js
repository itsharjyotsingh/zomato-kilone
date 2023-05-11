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
                method: 'GET',
                headers: {
                    'Content-Type': 'application/JSON',
                }
            });
            const dat = await res.json();
            
            setData(dat);
            setTimeout(()=>{
                setLoader(false);
                window.scrollBy(0,400);
            },1000);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getRestaurants();
    }
    ,[]);

    const loaderBox = {
        width: '100vw',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
    }

    const loaderAnimation = {
        width: '400px',
        height: '400px',
    }

    return (
        <div>
            {
        loader ? (
            <div style={loaderBox}>
                <Lottie style={loaderAnimation} animationData={animation}/>
            </div>
         ) : (
        <div className='container my-5'>
            <div className='container d-flex justify-content-start'>
                <h1>Restaurants</h1>
            </div>
            <div className='mx-auto container d-flex justify-content-evenly my-5 flex-wrap'>
                {data.map((val,id)=><RestauCards key={id} name={val.name} id={val._id} image={val.image}/>)}
            </div>
        </div>
        )}
        </div>
    );
}