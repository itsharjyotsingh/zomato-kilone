import React from 'react';
import { useState } from 'react';

export default function AddRest() {

    const [data,setData] = useState({
        name: '',
        city: '',
    });

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
        const connectToDb = async () => {
            try {
                const { name } = data;
                const city = data.city.toLowerCase();
                 
                await fetch('http://localhost:5000/restaurants',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/JSON',
                    },
                    body: JSON.stringify({
                        name,
                        city
                    }),
                });
                alert('Uploaded: '+ name);
            } catch(err) {
                console.log(err);
            }
        }
        connectToDb();
        event.preventDefault();
    }

    return (
        <div>
            
            <div className='container my-3'>
                <div className="form-floating mb-3">
                    <input type="text" name='name' className="form-control" id="floatingInput" onChange={updateState} value={data.name}/>
                    <label for="floatingInput">Restaurant Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" name='city' className="form-control" id="floatingPassword" onChange={updateState} value={data.city}/>
                    <label for="floatingPassword">Restaurant City</label>
                </div>
                <button className='btn btn-success my-2' onClick={logMeIn}>Submit</button>
            </div>
        </div>
    );
}