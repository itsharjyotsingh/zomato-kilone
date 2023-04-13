import React from 'react';
import { useState } from 'react';
import { Routes , Route } from 'react-router-dom';

import Signup from './Components/Singup';
import Login from './Components/Login';
import AddRest from './Components/AddRest';
import Restaurants from './Components/Restaurants';
import NavComponent from './Components/NavComponent';
import Branding from './Components/Branding.js';
import Home from './Components/Home';
import Footer from './Components/Footer';
import OrderOnline from './Components/OrderOnline.js';
import Available from './Components/Available.js';

const myStyle = {
    'backgroundImage': `url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')`,
    'backgroundRepeat': 'no-repeat',
    'height': '60vh',
    'minHeight': '450px',
    'width': '100vw',
    'backgroundSize':'1536px',

}

export default function Pages() {

    const [ localData, setLocalData] = useState(JSON.parse(localStorage.getItem('data')));

    return (
        <>
        <div style={ myStyle }>
            <NavComponent localData={localData}/>
            <Branding/>
        </div>

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/restaurants' element={<Restaurants/>}/>
            <Route path='/login' element={<Login setFun={setLocalData} localData={localData} />}/>
            <Route path='/add-restaurant' element={<AddRest/>}/>
            <Route path='/signup' element={<Signup localData={localData}/>}/>
            <Route path='/show' element={<></>}/>
            <Route path='/order-online' element={<OrderOnline/>}/>
            <Route path='/restaurant/:id' element={<Available/>}/>
        </Routes>

        <Footer/>
        </>
    );
}