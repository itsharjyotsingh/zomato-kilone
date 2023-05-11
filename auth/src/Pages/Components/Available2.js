import React from 'react';
import { useState,useEffect } from 'react';

import ProdCompo from './ProdCompo';

export default function Available() {
    
    const [newProd,setnewProd] = useState(null);

    const [products,setProducts] = useState([]);

    const addProduct = async(e) => {
        try {
            e.preventDefault();
            
            const restaurantId = window.location.pathname.substring(12);
            await fetch(`http://localhost:5000/addProd/${restaurantId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON',
                },
                body: JSON.stringify({
                    newProd,
                })
            });

            console.log('Added new Product');
        } catch(err) {
            console.log(err);
        }

    }

    const getData = async() => {
        try {
            const restauid = window.location.pathname.substring(12);
            const data = await fetch(`http://localhost:5000/restaurant/${restauid}`,{
                method: 'POST'
            });
            const res = await data.json();
            setProducts(res);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getData();
    },[]);

    var id = JSON.parse(localStorage.getItem('data'))._id;

    return (
        <>
            <div className='container my-5'>
            <div className='container d-flex justify-content-center'>
                <h1>Food</h1>
            </div>
            <div className='mx-auto container d-flex justify-content-around my-5 flex-wrap'>
                {products.map((things,id)=><ProdCompo id={id} things={things}/>)}
            </div>
            {(id==='643ea3ee1c9d77e72f71bb0d')?
            <div className='container'>
            <div className="card" style={{"width": "18rem"}}>
                <div className="card-body my-2">
                    <h5 className="card-title my-3">Add Product</h5>
                    <form onSubmit={addProduct}>
                        <input className='form-control my-2' type='text' placeholder='Product Name' value={newProd} onChange={(e)=>{setnewProd(e.target.value)}}/>
                        <button className='btn btn-primary' type='submit' >Add</button>
                    </form>
                </div>
            </div>
            </div>
            :<></>}
        </div>
        </>
    );
}