import React from 'react';
import cnpq from '../../icons/imgs/cnpq.png';

const CNPqIcon = ({ size, sx }) => {
    return (
        <img style={sx} width={size} height="auto" id="cnpq" alt="cnpq" src={cnpq}/>
    );
};

export default CNPqIcon;
