import React, { useState } from 'react';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { FavoriteTwoTone, Visibility, VisibilityOff } from '@mui/icons-material';
import TopicListIcon from '../../../lists/TopicListIcon';

const getColorIfIsValid = (isValid) => {
    if(isValid) {
        return { color: 'secondary' };
    }
    return {};
};

const PasswordField = ({ error, focused, label, name, onChange, register, validate, validationsList, ...props }) => {
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleOnChange = React.useCallback((event) => {
        setValue(event.target.value);
        if(onChange) {
            onChange(event);
        }
    }, [onChange]);

    const handleClickShowPassword = React.useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    const getTopicsAndIcons = () => {
        return validationsList.map(({ funcName, text }) => (
            {
                icon: <FavoriteTwoTone {...getColorIfIsValid(validate[funcName](value))}/>,
                topic: text
            }
        ));
    };

    return(
        <FormControl sx={{ m: 0, width: '100%' }} variant="outlined" size={'small'}>
            <InputLabel htmlFor={name} error={error}>{ label } *</InputLabel>
            <OutlinedInput required
                id={name} error={error}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label+' *'}
                inputProps={{ maxLength: '255' }}
                {...register(name, { onChange: handleOnChange, validate })}
                {...props}
            />
            {focused && <FormHelperText id={name}><TopicListIcon topicsAndIcons={getTopicsAndIcons()}/></FormHelperText>}
        </FormControl>
    );
};
export default PasswordField;
