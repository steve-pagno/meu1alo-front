import React from 'react';
import { FormatterHelper } from '../../../helpers/FormatterHelper';

const useGenericTableController = () => {
    const formatValue = (name, value) => {
        return FormatterHelper().formatValue(name, value);
    };

    return { formatValue };
};

export default useGenericTableController;
