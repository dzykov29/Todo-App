import React from 'react';
import '../styles/Overlay.css'

const Overlay = ({ handleCloseOverlay }) => {
    return (
        <div className='overlay' onClick={handleCloseOverlay}>
            
        </div>
    );
};

export default Overlay;