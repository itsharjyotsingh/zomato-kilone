import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RestauCards(props) {

    const Navigate = useNavigate();

    const redirect = (e) => {
        Navigate(`/restaurant/${e.target.name}`);
    }

    return (
        <>
            <div className="card my-2" style={{"width": "18rem"}}>
                <img src="https://assets.gqindia.com/photos/62a9d4653e8cdc9b632eb2ad/16:9/w_2560%2Cc_limit/10%2520restaurants%2520in%2520Mumbai%2520that%2520offer%2520the%2520best%2520sunset%2520views.jpg" className="card-img-top" alt="restaurant-img"/>
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button name={props.id} onClick={redirect} className='btn btn-primary'>Order</button>
                    </div>
            </div>
        </>
    );
}