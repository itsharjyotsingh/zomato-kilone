import React from 'react';

export default function Alert(props) {

    const alertBox = {
        display: 'flex',
        width: '100vw',
        justifyContent: 'center'
    }

    const alertMain = {
        width: '70vw'
    }

    var stats = '';

    if(props.content.code===200) {
        stats = 'success';
    } else if(props.content.code===400) {
        stats = 'warning';
    } else {
        stats = 'danger';
    }


    return (
        <div style={alertBox}>
            <div className={`alert alert-${stats}`} style={alertMain} role="alert">
                {props.content.txt}
            </div>
        </div>
    )
}