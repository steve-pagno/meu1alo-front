import React, { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { TextField } from '@mui/material';
import useCNPJController from './useCNPJController';

const CNPJField = ({ name, register, ...other }) => {
    return (
        <TextField
            variant="outlined"
            size="small"
            {...other}
            {...register(name, {
                pattern: /([0-9]{2}[.][0-9]{3}[.][0-9]{3}\/[0-9]{4}-[0-9]{2})/,
            })}
            InputProps={{
                inputComponent: CNPJMask,
            }}
        />
    );
};

// eslint-disable-next-line react/display-name
const CNPJMask = forwardRef((props, ref) => {
    const { data, name, onAccept, other } = useCNPJController(props);

    return (
        <IMaskInput
            {...other}
            name={name}
            mask={'00.000.000/0000-00'}
            value={data}
            inputRef={ref}
            onAccept={onAccept}
            overwrite
        />
    );
});

export default CNPJField;
