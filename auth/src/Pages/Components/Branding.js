import React from 'react';

import Input from './Input.js';

export default function Branding() {
    const brandinStyle = {
        'color': 'white',
    }

    const promo = {
        'color': 'white',
        'fontSize': '32px',
        'width': '100vw',
        'textAlign': 'center',
    }

    return (
        <>
            <div className='d-flex' style={{'height':'100%','width':'100%'}}>
                <div className='d-flex flex-column justify-center align-items-top'>
                    <img src='https://b.zmtcdn.com/web_assets/8313a97515fcb0447d2d77c276532a511583262271.png' height={'60vh'} className='mx-auto' alt='zomato-img'/>
                    <p style={promo} className='my-3'>Discover the best food & drinks</p>
                    <Input brandinStyle={brandinStyle}/>
                </div>
            </div>
        </>
    );
}