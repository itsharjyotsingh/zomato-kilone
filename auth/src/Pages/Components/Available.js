import React from 'react';
import { useState, useEffect } from 'react';

import ProdCompo from './ProdCompo';

export default function Available() {

    const [newProd, setnewProd] = useState({
        name: "",
        price: 0,
    });
    const [products, setProducts] = useState([]);
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const [counter, setCounter] = useState(0);

    const addProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('name', newProd.name);
        formData.append('price', newProd.price);
        if (url !== "") {
            formData.append('image', url);
        }
        formData.append('image', image);

        try {
            e.preventDefault();

            const restaurantId = window.location.pathname.substring(12);
            await fetch(`http://localhost:5000/addProd/${restaurantId}`, {
                method: 'POST',
                body: formData,
            });

            console.log('Added new Product');
        } catch (err) {
            console.log(err);
        }

    }

    const getData = async () => {
        try {
            const restauid = window.location.pathname.substring(12);
            const data = await fetch(`http://localhost:5000/restaurant/${restauid}`, {
                method: 'POST'
            });
            const res = await data.json();
            setProducts(res);
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setnewProd((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }

    useEffect(() => {
        getData();
    }, [counter]);

    var id = JSON.parse(localStorage.getItem('data'))._id;

    return (
        <>
            <div className='container my-5'>
                <div className='container d-flex justify-content-center'>
                    <h1>Food</h1>
                </div>
                <div className='mx-auto container d-flex justify-content-around my-5 flex-wrap'>
                    {products.map((things, id) => <ProdCompo id={id} things={things} />)}
                </div>
                {(id === '643ea3ee1c9d77e72f71bb0d') ?
                    <div className='container'>
                        <div className="card" style={{ "width": "18rem" }}>
                            <div className="card-body my-2">
                                <h5 className="card-title my-3">Add Product</h5>
                                <form onSubmit={addProduct}>
                                    <label>Product Image</label>
                                    <input className='form-control my-2 form-control' id='inputGroupFile02' type='file' onChange={(e) => { setImage(e.target.files[0]) }} disabled={url !== ""} capture />{(image !== "") ? (<button className='btn btn-danger input-group-text my-1' onClick={() => { setImage(""); document.getElementById('inputGroupFile02').value = "" }}>X</button>) : <></>}
                                    <input className='input-group-text' disabled={image !== ""} type='text' placeholder='Product Image Link' onChange={(e)=>{setUrl(e.target.value)}} />
                                    <label>Product Details</label>
                                    <input className='form-control my-2' name='name' type='text' placeholder='Product Name' value={newProd.name} onChange={handleChange} />
                                    <input className='form-control my-2' name='price' type='number' placeholder='Product Price' value={newProd.price} onChange={handleChange} />
                                    <button className='btn btn-primary' type='submit' >Add</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    : <></>}
            </div>
        </>
    );
}