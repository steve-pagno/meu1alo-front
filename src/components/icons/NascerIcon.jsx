import React from 'react';
import nascer from '../../icons/imgs/nascer.png';

const NascerIcon = ({ size, sx }) => {
    return (
        <img style={sx} width={size} height="auto" id="nascer" alt="nascer" src={nascer}/>
    );
};

export default NascerIcon;
