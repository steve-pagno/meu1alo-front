import React from 'react';
import secretary from '../../icons/imgs/secretary.png';

const SecretaryIcon = ({ size, sx }) => {
    return (
        <img style={sx} width={size} height="auto" id="secretary" alt="secretaria" src={secretary}/>
    );
};

export default SecretaryIcon;
