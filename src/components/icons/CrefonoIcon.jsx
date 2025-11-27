import React from 'react';
import crefono from '../../icons/svgs/crefono.svg';

const CrefonoIcon = ({ size, sx }) => {
    return (
        <img style={sx} width={size} height="auto" id="crefono" alt="crefono" src={crefono}/>
    );
};

export default CrefonoIcon;
