import React from 'react';
import fapesc from '../../icons/imgs/fapesc.png';

const FapescIcon = ({ size, sx }) => {
    return (
        <img style={sx} width={size} height="auto" id="fapesc" alt="fapesc" src={fapesc}/>
    );
};

export default FapescIcon;
