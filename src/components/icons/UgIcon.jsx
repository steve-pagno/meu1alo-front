import React from 'react';
import ug from '../../icons/imgs/UG.png';

const UgIcon = ({ size, sx }) => {
    return (
        <img style={sx} width={size} height="auto" id="ug" alt="ug" src={ug}/>
    );
};

export default UgIcon;
