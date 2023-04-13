import React from 'react';
import { useState } from 'react';

export default function Login({setFun,localData}) {

    const [data,setData] = useState({
        email: '',
        password: '',
    })

    const updateState = (e) => {
        const { name , value } = e.target;
        setData((prev)=>{
            return {
                ...prev,
                [name]: value,
            }
        });
    }
    
    const logMeIn = (event) => {
        event.preventDefault();
        const connectToDb = async () => {
            const { email,password } = data; 
            fetch('http://localhost:5000/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            })
            .then((res)=>{
                res.json()
                .then((data)=>{
                    console.log(data);
                    if(data==="Not found") {
                        alert('Wrong Password');

                    } else {
                        alert('Logged In Successfully');
                        localStorage.setItem('data',JSON.stringify(data));
                        setFun(data);
                    }
                })
            })
            .catch((err)=>{
                console.log(err);
            });
        }
        connectToDb();
    }

    const LogOut = () => {
        localStorage.setItem('data',null);
        setFun(null);
    }

    // if(localStorage.getItem)

    return (
        <>
            {(localData===null)?
            <div className='container w-50 my-5'>
                <h1>Login</h1>
                <form method='POST'>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label" >Email address</label>
                        <input type="email" name="email" className="form-control" id="exampleFormControlInput1" onChange={updateState} placeholder="email" value={data.email}/>
                    </div>

                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label for="inputPassword6" className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                            <input type="password" name="password" id="inputPassword6" className="form-control" aria-labelledby="passwordHelpInline" onChange={updateState}/>
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                            Must be 8-20 characters long.
                            </span>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-success my-4' onClick={logMeIn}>Submit</button>
                </form>
            </div>:
            <button className='btn btn-danger my-2 mx-2' type='button' onClick={LogOut}>Logout</button>
            }
        </>
    );
}