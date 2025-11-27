import { useState } from 'react';

const useCNPJController = ({ name, onChange, ...other }) => {
    const [data, setData] = useState(other.value || other.defaultValue || '');

    const onAccept = (value) => {
        onChange({ target: { name: name, value: value } });
        setData(value);
    };

    return { data, name, onAccept, other };
};

export default useCNPJController;
