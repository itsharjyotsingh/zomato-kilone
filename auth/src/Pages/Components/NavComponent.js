import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavComponent(localData) {
    const disp = {
        'color': 'white'
    }

    const myStyle = {
        'backgroundImage':`url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')`,
        'backgroundRepeat': 'no-repeat',
        'width': '100vw',
        'backgroundSize': '1536px',
    }

    var id='';
    if(localStorage.getItem('data')!=='null') {
        id = JSON.parse(localStorage.getItem('data'))._id;
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={myStyle}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation" style={disp}>
                <span className="navbar-toggler-icon" style={disp}></span>
                </button>
                <h2 className="navbar-brand" href="#" style={disp} >Hungry?</h2>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to='/' style={disp}><h5>Home</h5></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/login' style={disp}><h5>{localData.localData===null ? 'Login' : 'Logout'}</h5></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/signup' style={disp}><h5>{localData.localData===null ? 'Signup' : ''}</h5></NavLink>
                    </li>
                    {(id==='64370572182b02898f869243')?<li className="nav-item">
                        <NavLink className="nav-link" to='/add-restaurant' style={disp}><h5>Add Restaurants</h5></NavLink>
                    </li>:<></>}
                </ul>
                </div>
            </div>
        </nav>
    );
}