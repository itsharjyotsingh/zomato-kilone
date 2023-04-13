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
                 
                fetch('http://localhost:5000/restaurants',{
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
            <form method='POST'>
                <input type='text' name='name' placeholder='Restuarant Name' onChange={updateState} value={data.name}></input><br></br>
                <input type='text' name='city' placeholder='City' onChange={updateState} value={data.city}></input><br/>
                <button type='submit' onClick={logMeIn}>Submit</button>
            </form>
        </div>
    );
}