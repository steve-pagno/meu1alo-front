import React, { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { TextField } from '@mui/material';
import useCEPFieldController from './useCEPFieldController';

const CEPField = ({ name, register, setValue, onAddressFound, onSearchStart, onError, ...other }) => {
    const { onChange, onBlur, ref, ...registerProps } = register(name);

    return (
        <TextField
            variant="outlined"
            size="small"
            label="CEP"
            {...other}
            {...registerProps}
            InputProps={{
                inputComponent: CEPMask,
            }}
            inputProps={{ 
                name,
                onChange,
                onBlur,
                onAddressFound,
                onSearchStart,
                onError,
                setValue,
                ...other
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