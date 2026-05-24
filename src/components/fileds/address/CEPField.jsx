import React, { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { TextField } from '@mui/material';
import useCEPFieldController from './useCEPFieldController';

const CEPField = ({ name, onAddressFound, onError, onSearchStart, register, setValue, ...other }) => {
    const { maxLength, pattern, ...filteredInputProps } = other.inputProps || {};

    return (
        <TextField
            variant="outlined"
            size="small"
            label="CEP"
            {...other}
            {...register(name)}
            InputProps={{
                inputComponent: CEPMask,
            }}
            inputProps={{
                onAddressFound,
                onError,
                onSearchStart,
                setValue,
                ...filteredInputProps
            }}
        />
    );
};

// eslint-disable-next-line react/display-name
const CEPMask = forwardRef((props, ref) => {
    const { data, name, onAccept, onBlur, other } = useCEPFieldController(props);

    return (
        <IMaskInput
            {...other}
            name={name}
            mask={'00000-000'}
            value={data}
            inputRef={ref}
            onAccept={onAccept}
            onBlur={onBlur}
            overwrite
        />
    );
});

export default CEPField;