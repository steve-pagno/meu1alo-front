import React from 'react';

const useSelectStyles = () => {
    return {
        chipElement: {
            maxHeight: '23px'
        },
        multipleChipContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            whiteSpace: 'normal'
        },
        OpenedOptionsContainer:  {
            maxHeight: '300px',
        },
        select: {
            width: '100%',
        },
    };
};

export default useSelectStyles;
