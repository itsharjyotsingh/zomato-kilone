import React from 'react';

export default function ProdCompo(props) {

    return (
        <>
            <div className="card my-2" style={{ "width": "18rem" }}>
                <img src={props.things.image} className="card-img-top" alt="restaurant-img" />
                <div className="card-body">
                    <h4 className="card-title">{props.things.name}</h4>
                    <h6 className="card-title">{props.things.price}</h6>
                    <button className='btn btn-primary' >Add To Cart</button>
                </div>
            </div>
        </>
    );
}