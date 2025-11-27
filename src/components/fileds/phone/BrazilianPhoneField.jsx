import React, { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { TextField } from '@mui/material';
import usePhoneMaskController from './usePhoneMaskController';

const BrazilianPhoneField = ({ name, register, ...other }) => {
    return (
        <TextField
            variant="outlined"
            size="small"
            {...other}
            {...register(name, {
                pattern: /(\([1-9]{2}\) 9?[0-9]{4}-[0-9]{4})|(0800 [0-9]{3} [0-9]{4})/,
            })}
            InputProps={{
                inputComponent: PhoneMask,
            }}
        />
    );
};

// eslint-disable-next-line react/display-name
const PhoneMask = forwardRef((props, ref) => {
    const { data, getMask, name, onAccept, other } = usePhoneMaskController(props);

    return (
        <IMaskInput
            {...other}
            name={name}
            mask={getMask(data)}
            value={data}
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={onAccept}
            overwrite
        />
    );
});

export default BrazilianPhoneField;
