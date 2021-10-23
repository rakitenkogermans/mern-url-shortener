import React from 'react';

function Loader() {
    return (
        <div className="calc__class" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="preloader-wrapper active" style={{height: 100, width: 100}}>
                <div className="spinner-layer" style={{border: '#5e35b1'}}>
                    <div className="circle-clipper left">
                        <div className="circle"/>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"/>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loader;
