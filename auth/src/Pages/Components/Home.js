import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const bckimg = {
        'backgroundImage': `url('https://b.zmtcdn.com/webFrontend/e5b8785c257af2a7f354f1addaf37e4e1647364814.jpeg?output-format=webp&fit=around|402:360&crop=402:360;*,*')`,
        'backgroundSize': 'cover',
        'height': '150px',
        'borderRadius': '15px 15px 0px 0px'
    }

    const navigate = useNavigate();

    const redirect = () => {
        navigate('/order-online');
    }

    return (
        <>
            <div onClick={redirect} className="card my-4 mx-3" style={{"width":"40vw",'maxWidth': '300px'}}>
                <div style={bckimg}></div>
                <div className="card-body">
                    <h5 className="card-title">Order Online</h5>
                    <p className="card-text">Stay home and order to your doorstep</p>
                </div>
            </div>
        </>
    );
}