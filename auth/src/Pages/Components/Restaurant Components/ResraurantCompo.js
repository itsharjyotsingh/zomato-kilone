import React from 'react';

export default function RestaurantCompo(props) {
    return (
        <>
            {
                props.mila.map(ele=>
                    <div className="card" style={{"width":"18rem"}}>
                        <img src="..." className="card-img-top" alt="restaurant-img"/>
                        <div className="card-body">
                            <h5 className="card-title">{ele.name}</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button className="btn btn-primary">Order</button>
                        </div>
                    </div>
                )
            }
        </>
    );
}