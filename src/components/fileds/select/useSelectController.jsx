import React, { useState, useEffect } from 'react';

const useSelectController = (register, multiple, onChange, other) => {
    const [value, setValue] = useState(other.value || other.defaultValue || register.value || (multiple? [] : ''));

    // Sincroniza o estado interno caso a propriedade "value" enviada por cima mude depois de renderizado
    useEffect(() => {
        if (other.value !== undefined && other.value !== value) {
            setValue(other.value);
        }
    }, [other.value]);

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
