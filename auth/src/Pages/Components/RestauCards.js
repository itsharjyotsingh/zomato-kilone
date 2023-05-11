import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react'; 

import circleLoader from '../../Animations/circleLoader.json';

export default function RestauCards(props) {

    const[loader,setLoader] = useState(true);

    const Navigate = useNavigate();

    const redirect = (e) => {
        Navigate(`/restaurant/${e.target.name}`);
    }

    const stopAnimate = () => {
        setLoader(false);
    }

    const imageStyle = {
        display : (loader===false)?'block' : 'none',
        height: '200px',
        width: '100%',
        objectFit: 'cover',
    }

    return (
        <>
            <div className="card my-2" style={{"width": "18rem"}}>
                {
                    (loader) ? <Lottie animationData={circleLoader} loop={true}/>:''
                }
                <img src={props.image} style={imageStyle} onLoad={stopAnimate} className="card-img-top" alt="restaurant-img"/>
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button name={props.id} onClick={redirect} className='btn btn-primary'>Order</button>
                    </div>
            </div>
        </>
    );
}