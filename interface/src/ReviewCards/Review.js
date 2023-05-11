import React from 'react';
import './review.css';

export default function Review() {

    return (
        <>
            
            <div className='d-flex justify-content-center'>
                <h1>Reviews By Our Foodie Customers</h1>
            </div>
            <div className='w-100 d-flex justify-content-center align-items-center' style={{ 'height': '600px' }}>
                <div className='box sideBoxCovers l'>
                    <div className='imageStyling'>

                    </div>
                    <div>
                        <div className='d-flex justify-content-between align-items-end'>
                            <h1>Name</h1>
                            <p>⭐⭐⭐⭐⭐</p>
                        </div>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim luctus arcu, et facilisis neque iaculis ac.</p>
                        </div>
                    </div>
                </div>
                <div className='box mainBox'>
                    <div className='mainImage'>

                    </div>
                    <div className='d-flex justify-content-between align-items-end'>
                        <h1>Name</h1>
                        <p>⭐⭐⭐⭐⭐</p>
                    </div>
                    <div>
                        {/* isme review hoga */}
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim luctus arcu, et facilisis neque iaculis ac.</p>
                    </div>
                </div>
                <div className='box sideBoxCovers r'>
                    <div className='imageStyling'>
                    </div>
                    <div>
                        <div className='d-flex justify-content-between align-items-end'>
                            <h1>Name</h1>
                            <p>⭐⭐⭐⭐⭐</p>
                        </div>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim luctus arcu, et facilisis neque iaculis ac.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* shadow */}
{/* 
            <div className='w-100 d-flex justify-content-center align-items-center border border-primary containerPlane' style={{ 'height': '600px' }}>
                <div className='box sideBoxCovers shadow l sideIndex tedha'>
                    
                </div>
                <div className='box mainBox shadow mainIndex tedha'>
                    
                </div>
                <div className='box sideBoxCovers shadow r sideIndex tedha'>
                    
                </div>
            </div> */}
        </>
    );
}