import React from 'react';
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Input() {

    const [location,setLocation] = useState([]);

    const [typo,setType] = useState('');

    const updater = (e) => {
        setType(e.target.value);
    }

    const toPascalCase = str => (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');

    useEffect(()=>{
        const gettingLocations = async() => {
            try {
                const res = await fetch('http://localhost:5000/getLocations',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/JSON',
                    },
                    body: JSON.stringify({
                        typo,
                    })
                })
                var data = await res.json();
                setLocation(data);
            } catch(err) {
                console.log(err);
            }
        }
        gettingLocations();
    },[typo])

    return (
        <div className='container w-50'>
                <div className="input-group mb-3">
                    <input className="btn btn-secondary dropdown-toggle bg-light text-dark w-25" type="text" data-bs-toggle="dropdown" placeholder='Patiala' value={typo} onChange={updater}></input>
                    <ul className="dropdown-menu">
                        {location.map((thing,id)=>{return <NavLink key={id} className="dropdown-item bg-light text-dark" to={`/order-in/${thing}`}>{toPascalCase(thing)}</NavLink>})}
                    </ul>
                    <input type="text" className="form-control" aria-label="Text input with checkbox" placeholder='Search for your favorite dish here.'/>
                </div>
        </div>
    );
}