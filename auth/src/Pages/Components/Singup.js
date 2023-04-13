import React from 'react';
import { useState } from 'react';

export default function Signup({localData}) {

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        number: '',
        password: ''
    });

    const updation = (e) => {
        const { name , value } = e.target;
        setData((prev)=>{
            return {
                ...prev,
                [name]: value,
            }
        });
    }

    const postData = (e) => {
        const { firstName, lastName, email, number, password } = data;
        if(password === document.querySelector('#cpass').value) {
            
            fetch("http://localhost:5000/post",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/JSON",
                },
                body: JSON.stringify({ firstName, lastName, email, number, password }),
            }).then((resp)=>{
                console.log(resp);
                return resp.json();
            }).catch((err)=>{
                console.log(err);
            });
        } else {
            alert('Password dosent match');
        }
        
        e.preventDefault();
    }

    return (
        <>

        <div className='container w-50 my-5'>
            <h1>Sign Up</h1>
            <form method='POST'>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label" >First Name</label>
                    <input type="text" name="firstName" className="form-control" id="exampleFormControlInput1" onChange={updation} value={data.firstName}/>
                </div>

                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label" >Last Name</label>
                    <input type="text" name="lastName" className="form-control" id="exampleFormControlInput1" onChange={updation} value={data.lastName}/>
                </div>

                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label" >Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleFormControlInput1" onChange={updation} value={data.email}/>
                </div>

                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label" >Mobile Number</label>
                    <input type="number" name="number" className="form-control" id="exampleFormControlInput1" onChange={updation} value={data.number}/>
                </div>

                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label for="inputPassword6" className="col-form-label">Password</label>
                    </div>
                    <div className="col-auto">
                        <input type="password" name="password" id="inputPassword6" className="form-control my-2" aria-labelledby="passwordHelpInline" onChange={updation} placeholder='Enter Your Password' value={data.password}/>
                    </div>

                    <div className="col-auto">
                        <span id="passwordHelpInline" className="form-text">
                        Must be 8-20 characters long.
                        </span>
                    </div>
                </div>

                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label for="inputPassword6" className="col-form-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </div>
                    <div className="col-auto">
                    <input type="password" name="password" id='cpass' className="form-control" aria-labelledby="passwordHelpInline" placeholder='Confirm Password'/>
                    </div>

                    <div className="col-auto">
                        <span id="passwordHelpInline" className="form-text">
                        Make sure your passwords entered are same.
                        </span>
                    </div>
                </div>

                <button type='submit' className='btn btn-success my-4' onClick={postData}>Sign Up</button>
            </form>
        </div>
    </>
    );
}