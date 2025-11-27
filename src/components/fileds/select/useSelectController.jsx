import React, { useState } from 'react';

const useSelectController = (register, multiple, onChange, other) => {
    const [value, setValue] = useState(other.value || other.defaultValue || register.value || (multiple? [] : ''));

    const handleOnchange = (event) => {
        if(multiple && typeof event.target.value === 'string') {
            event.target.value = event.target.value.split(',');
        }

        register.onChange(event);
        if(onChange) {
            onChange(event);
        }

        setValue(event.target.value);
    };

    const configValueManipulation = () => {
        return {
            ...register,
            onChange: handleOnchange,
            value: value,
        };
    };

    return { configValueManipulation };
};

export default useSelectController;
