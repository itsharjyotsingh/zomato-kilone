import React from 'react';
import { useState } from 'react';
import Alert from './Alert/Alert.js';
import Lottie from 'lottie-react';

import loader1 from '../../Animations/login.json'

export default function AddRest() {

    const [loader, setLoader] = useState(false);
    const [content, setContent] = useState({ txt: null, code: null });
    const [popup, setPopup] = useState(false);

    const [data, setData] = useState({
        name: '',
        city: '',
    });
    const [image, setImage] = useState("");
    const [url,setUrl] = useState("");

    const updateState = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }

    const trying = async() => {
        setLoader(true);
        const formData = new FormData();
        if(url!=="") {
            formData.append('image', url);
        }
        formData.append('image', image);
        formData.append('name', data.name);
        formData.append('city', data.city);
        try {
            const data = await fetch('http://localhost:5000/restaurants', {
                method: 'POST',
                body: formData
            });
            console.log(data);
            setContent({ txt: data.response, code: data.status })
            setLoader(false);
            setPopup(true);
            setTimeout(() => {
                setPopup(false);
            }, 2000);
        } catch(err) {
            console.log(err);
        }
    }


    const box = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '30vw',
        height: '70vh',
        borderRadius: '10px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    }

    const centralize = {
        position: 'relative',
        top: '10px',
        display: 'flex',
        justifyContent: 'center',
    }

    const poora = {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.5)',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center'
    }

    const loaderSettings = {
        width: '400px',
        height: '400px',
        zIndex: '5'
    }

    return (
        <>
            {
                (popup) ? <Alert content={content} /> : <></>
            }
            <div style={centralize}>
                {
                    (loader) ? (
                        <div style={poora}><Lottie style={loaderSettings} animationData={loader1} loop={true} /></div>
                    ) : <></>
                }
                <div style={box}>
                    <h1>Add New Restarants</h1>
                    <div className='container my-3'>

                        <div className="input-group mb-3">
                            <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} disabled={url!==""} capture className="form-control" id="inputGroupFile02" />{(image!=="") ? (<button className='btn btn-danger input-group-text' onClick={()=>{setImage(""); document.getElementById('inputGroupFile02').value=''}}>X</button>):<></>}

                            <input type='string' style={{'width':'40%'}} className='input-group-text' disabled={image!==""} placeholder='Image Url' onChange={(e)=>{setUrl(e.target.value)}}></input>
                        </div>
                        <div className="form-floating">
                            <input type="text" name='name' className="form-control" id="floatingInput" onChange={updateState} value={data.name} />
                            <label htmlFor="floatingInput">Restaurant Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" name='city' className="form-control" id="floatingPassword" onChange={updateState} value={data.city} />
                            <label htmlFor="floatingPassword">Restaurant City</label>
                        </div>
                        <button className='btn btn-success my-2' onClick={trying}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
}