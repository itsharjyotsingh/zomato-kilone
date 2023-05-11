import React from 'react';
import { useState } from 'react';
import Alert from './Alert/Alert.js';
import Lottie from 'lottie-react';

import loginAnimation from '../../Animations/login.json';

export default function Login(props) {


    const loginBox = {
        height: '200px',
        width: '200px',
        position: 'relative',
        borderRadius: '10px',
        opacity: '1'
    }

    const centralize = {
        position: 'absolute',
        height: '60vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    }


    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const [loader, setLoader] = useState(false);
    const [content, setContent] = useState({ txt: null, code: null });
    const [popup,setPopup] = useState(false);

    const localData = localStorage.getItem('data');

    const updateState = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }


    const logMeIn = async (event) => {
        try {
            setLoader(true);
            event.preventDefault();
            const { email, password } = data;
            const login = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const res = await login.json();

            setContent({ txt: res.response, code: login.status });

            setTimeout(()=>{
                setLoader(false);
                setPopup(true);
                if(login.ok) {
                    localStorage.setItem('data',JSON.stringify(res.user));
                    props.setFun();
                }
                setTimeout(()=>{
                    setPopup(false);
                },2000);
            },1000);

        } catch (err) {
            console.log(err);
        }
    }

    const LogOut = () => {
        localStorage.removeItem('data');
        props.setFun();
    }

    return (
        <> 
            {
                (popup) ? (<Alert content={content} />) : <></>
            }

            {
                (loader) ?  (
                <div style={centralize}>
                    <Lottie style={loginBox} animationData={loginAnimation} loop={false} />
                </div>) : <></>
            }

            {(localData === null) ?
                <div className='container w-50 my-5'>
                    <h1>Login</h1>
                    <form method='POST'>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label" >Email address</label>
                            <input type="email" name="email" className="form-control" id="exampleFormControlInput1" onChange={updateState} placeholder="email" value={data.email} />
                        </div>

                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="inputPassword6" className="col-form-label">Password</label>
                            </div>
                            <div className="col-auto">
                                <input type="password" name="password" id="inputPassword6" className="form-control" aria-labelledby="passwordHelpInline" onChange={updateState} />
                            </div>
                            <div className="col-auto">
                                <span id="passwordHelpInline" className="form-text">
                                    Must be 8-20 characters long.
                                </span>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-success my-4' onClick={logMeIn}>Submit</button>
                    </form>
                </div> :
                <button className='btn btn-danger my-2 mx-2' type='button' onClick={LogOut}>Logout</button>
            }
        </>
    );
}