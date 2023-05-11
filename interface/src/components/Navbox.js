// Components
import React from 'react';
import { Link } from 'react';
import Lottie from "lottie-react";

// Animations
import foodAnimation1 from '../animations/food-caraousal-light.json';
import foodAnimation2 from '../animations/food-caraousal-dark.json';

// Images
import dayNight from '../images/day-and-night.png';

// CSS file
import '../CSS/navbox.css';

export default function Navbox(props) {

    const backgroundTheme = props.dark ? 'dark' : 'light';
    const textTheme = props.dark ? 'dark' : 'light';

    const foodAnimation = props.dark ? foodAnimation1 : foodAnimation2;

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-${backgroundTheme} bg-${backgroundTheme}`}>
                <div className="container-fluid">
                <Lottie id={backgroundTheme==='light' ? 'lighto' : 'darko'} animationData={foodAnimation} loop={true} />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" to="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" to="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" to="#">Action</a></li>
                                    <li><a className="dropdown-item" to="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" to="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                        <form className="d-flex align-items-center">
                            <div class="form-check form-switch ">
                                <input class="form-check-input" onChange={props.toggleTheme} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <p>Dark Mode</p>
                            </div>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}