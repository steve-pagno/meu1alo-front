import React from 'react';
import mpawhite from '../../icons/svgs/mpawhite.svg';

const MPAWhiteIcon = ({ size, sx }) => {
    return (
        <img style={sx} width={size} height="auto" id="mpawhite" alt="Meu primeiro alô" src={mpawhite}/>
    );
};

export default MPAWhiteIcon;
